import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditSession from "./EditSession";
import { Toast } from "../Commons/Toast";
import {
  setSubDetails,
  getSubDetails,
  isEligible,
} from "../utils/SubscriptionDetails";

const base_url = process.env.REACT_APP_API_URL;

const ChatComponent = () => {
  const location = useLocation();
  const topicTitle = location.state?.data;
  const thoughts = location.state?.thoughts;
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editSessionlayout, setEditSessionLayout] = useState(false);
  const [dotclickedsesh, setDotClickedSesh] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  function getPrompt() {
    const prompt1 = `Assume the role of an AI assistant with expertise in psychological analysis and introspection. 
    Your objective is to help me explore and understand my thoughts over time, providing insights for personal growth and self-awareness. 
    You are presented with a series of thoughts from me, each accompanied by a timestamp indicating when the thought was added. 
    Your task is to analyze these thoughts in the context of their timing, 
    offer constructive insights about how my thoughts have evolved or changed over time in a personalized, 
    conversational manner and pose questions that encourage me to delve deeper into
     understanding my mindset and emotions associated with these thoughts.`;

    const mytopic =
      "this is the topic under which i have stored my thoughts, my topic : " +
      topicTitle +
      ",,";

    const mythoughts =
      "and here are my thoughts and timestamps stored in json form: " +
      JSON.stringify(thoughts) +
      ",,";

    const prompt2 = `        Based on these thoughts and their respective timestamps, provide an analysis that identifies any patterns, 
    shifts, or significant changes in my mindset or emotional state over time.
    Offer insights into what these changes might signify and ask open-ended questions that guide me to explore more about the 
    evolution of my thought patterns, feelings, or potential actions i might consider. 
    End your response with open-ended questions that invite me to discuss further, explore my feelings,
     or clarify my aspirations. Your goal is to foster an ongoing, engaging dialogue that helps
      me gain a deeper self-understanding of my mental journey.`;

    return prompt1 + mytopic + mythoughts + prompt2;
  }

  function updateSessions(sessions) {
    setUserSessions(sessions);
    setSelectedSession(sessions[0]);
  }

  const LoadSession = async (session) => {
    setSelectedSession(session);
    try {
      const response = await fetch(base_url + "chatmessages/" + session._id, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("usertoken"),
        },
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json.data);
      json.data.splice(0, 1);
      setMessages(json.data);
    } catch (e) {
      console.log(e);
    }
  };

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  function logout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

  async function Chat(analyse, session) {
    if (isEligible()) {
      let input;
      if (analyse) {
        input = getPrompt();
      } else {
        input = userInput;
      }

      try {
        setUserInput("");
        const response = await fetch(base_url + "socketchat", {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("usertoken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: localStorage.getItem("userid"),
            sessionid: session._id,
            userinput: input,
          }),
        });
        if (response.status === 403) {
          logout();
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const subDetails = getSubDetails();
        subDetails.aiInteractionCount = json.updatedAICount;
        setSubDetails(subDetails);
      } catch (e) {
        console.log(e);
      }
    } else {
      setDialogMessage("AI Limit reached , subscribe to keep using !");
      setShowDialog(true);
    }
  }

  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await fetch(base_url + "startsession", {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("usertoken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: localStorage.getItem("userid"),
            sessionTitle: topicTitle,
            time: new Date().toISOString(),
          }),
        });
        if (response.status === 403) {
          logout();
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const sessions = json.sessions.reverse();
        updateSessions(sessions);
        Chat(true, sessions[0]);
        localStorage.setItem("sessionLoaded", JSON.stringify(sessions[0]));
      } catch (e) {
        console.log(e);
      }
    };
    const sessionLoaded = localStorage.getItem("sessionLoaded");
    if (sessionLoaded === "") {
      startSession();
    } else {
      LoadSession(JSON.parse(sessionLoaded));
      getSessions();
    }
  }, []);

  useEffect(() => {
    // Establish WebSocket connection
    const newWs = new WebSocket(process.env.REACT_APP_WS_URL);

    newWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.messages) {
          // Update messages state with new data
          data.messages.splice(0, 1);
          setMessages(data.messages);
        }
      } catch (e) {
        console.log(e);
      }
    };

    newWs.onopen = () => {
      console.log("WebSocket connected");
    };

    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newWs.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup function to close WebSocket connection when component unmounts
    return () => {
      newWs.close();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Chat(false, selectedSession);
  };

  async function getSessions() {
    try {
      const response = await fetch(
        base_url + "sessions/" + localStorage.getItem("userid"),
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("usertoken"),
          },
        }
      );
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setUserSessions(json.data.reverse());
    } catch (e) {
      console.log(e);
    }
  }

  const editSession = async () => {
    setEditSessionLayout(true);
  };

  const handleeditclose = () => {
    setEditSessionLayout(false);
  };

  function UserSessionsDiv({ isVisible }) {
    const visibilityClass = isVisible ? "" : "hidden";
    const sestoolvisibility = isVisible ? "hidden" : "";
    return (
      <div
        id="sessions"
        className={`${visibilityClass} h-screen md:block md:w-64 min-w-64 flex-shrink-0 bg-gray-200 overflow-y-auto`}
      >
        <div
          className={`${sestoolvisibility} flex cursor-pointer px-4 py-2 sticky top-0 z-10 bg-gray-50 shadow-lg mb-4`}
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img
            src="/mindcachelogo.png"
            className="h-8 w-8 rounded-full mr-2"
            alt="logo"
          />
          <div className="my-auto text-xl font-sans text-justify">
            Mind Cache AI
          </div>
        </div>
        <div
          className={`${visibilityClass} h-10 flex cursor-pointer px-4 py-2 bg-gray-50 sticky top-0 z-10 shadow-lg mb-4`}
        >
          <div className="my-auto text-xl font-sans text-justify">
            Previous sessions
          </div>
        </div>
        <div className="">
          {userSessions.map((session, index) => (
            <div
              key={session._id}
              className={`flex justify-between text-black text-xl px-4 py-2 m-1 rounded-lg cursor-pointer hover:bg-slate-400 
          ${
            selectedSession && session._id === selectedSession._id
              ? "bg-blue-600"
              : "bg-slate-200"
          }`}
              onClick={() => {
                LoadSession(session);
                localStorage.setItem("sessionLoaded", JSON.stringify(session));
              }}
            >
              {session.sessionTitle}
              <img
                src="./3dotlogo.png"
                className="w-8 h-8 cursor-pointer"
                onClick={() => {
                  setDotClickedSesh(session);
                  editSession();
                }}
                alt="Edit"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {editSessionlayout && (
        <EditSession
          onClosedialog={handleeditclose}
          session={dotclickedsesh}
          updateSesh={updateSessions}
          logout={logout}
        />
      )}

      <div
        className={`fixed inset-0 z-30 transition-opacity ${
          isSidebarOpen ? "bg-black bg-opacity-50 backdrop-blur-sm" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 transition duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-200 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <UserSessionsDiv isVisible={true} />
      </div>

      <UserSessionsDiv isVisible={false} />

      <div className="flex-grow " onClick={() => setSidebarOpen(false)}>
        <div
          id="toolbar"
          className="h-10 md:h-0 md:hidden flex justify-between shadow-md"
        >
          <div
            className="flex items-center cursor-pointer px-4 py-2 "
            onClick={() => {
              navigate(`/`);
            }}
          >
            <img
              src="/mindcachelogo.png"
              className="h-8 w-8 rounded-full mr-2"
              alt="logo"
            />
            <div className="my-auto text-xl font-sans text-justify">
              Mind Cache AI
            </div>
          </div>

          <div className="flex items-center">
            <img
              src="/navbaricon.png"
              className="h-8 w-auto mr-4"
              alt=""
              onClick={(e) => {
                toggleSidebar();
                e.stopPropagation();
              }}
            />
          </div>
        </div>

        <div
          id="messages"
          className="h-80 md:h-90 overflow-y-auto px-4 md:px-16"
        >
          {messages.map((msg, index) => (
            <div key={index} className="">
              <div className="text-black font-bold mt-2 text-lg">
                {msg.role === "user" ? "You: " : "Mind Cache AI: "}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div id="form" className="h-10 flex items-center ">
          <form onSubmit={handleSubmit} className="w-full flex justify-center">
            <div className="mx-4 md:mx-16 flex w-full border border-black rounded-lg overflow-hidden">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message"
                className="p-2 flex-grow"
              />
              <button
                type="submit"
                className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-lg font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};

export default ChatComponent;

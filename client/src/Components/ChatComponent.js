import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditSession from "./EditSession";

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
  // const [ws, setWs] = useState(null);
  const messagesEndRef = useRef(null);

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
      const response = await fetch(
        "http://localhost:5000/chatmessages/" + session._id,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("usertoken"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json.data);
      json.data.splice(0,1);
      setMessages(json.data);
    } catch (e) {
      console.log(e);
    }
  };

  async function Chat(analyse, session) {
    let input;
    if (analyse) {
      input = getPrompt();
    } else {
      input = userInput;
    }

    try {
      setUserInput("");
      const response = await fetch("http://localhost:5000/socketchat", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("usertoken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: session._id,
          userinput: input,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const json = await response.json();
      // setMessages(json.messages);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/startsession", {
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
    const newWs = new WebSocket("ws://localhost:5000");

    newWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.messages) {
          // Update messages state with new data
          data.messages.splice(0,1);
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

    // setWs(newWs);

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
        "http://localhost:5000/sessions/" + localStorage.getItem("userid"),
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("usertoken"),
          },
        }
      );
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

  return (
    <div className="flex h-screen">
      {editSessionlayout && (
        <EditSession
          onClosedialog={handleeditclose}
          session={dotclickedsesh}
          updateSesh={updateSessions}
        />
      )}

      <div className=" bg-slate-200 overflow-y-auto w-1/5">
        {userSessions.map((session, index) => (
          <div
            key={session._id}
            className={`flex justify-between text-black text-xl px-4 py-2 m-1 rounded-lg hover:bg-slate-400 
              ${
                selectedSession && session._id === selectedSession._id
                  ? "bg-red-300"
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

      <div className=" w-4/5 ">
        <div className="mx-16 my-0 px-4  bg-white h-3/4 overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="p-4 flex justify-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message"
            className="border-2 rounded-lg p-2 w-96"
          />
          <button
            type="submit"
            className="ml-4 bg-blue-300 hover:bg-blue-600 rounded-lg px-4 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;

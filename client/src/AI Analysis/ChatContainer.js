import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "../Commons/Toast";
import { getSessions, startSession, LoadSession, aiChat } from "./ChatAPI";
import { ChatBar } from "./ChatBar";
import { ChatSessions } from "./ChatSessions";
import { MessageInput, MessageSection } from "./ChatMessages";
import EditSession from "./EditSession";

export function Chat() {
  const location = useLocation();
  const topicTitle = location.state?.data;
  const thoughts = location.state?.thoughts;
  const sessionsr = location.state?.sessions;
  const navigate = useNavigate();

  //required state
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [editSessionlayout, setEditSessionLayout] = useState(false);
  const [dotclickedsesh, setDotClickedSesh] = useState(null);
  const [ws, setWs] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  function logout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("username");
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

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

  const initWebSocket = (sessionId) => {
    // Close existing WebSocket connection if open
    if (ws) {
      ws.close();
    }

    // Create a new WebSocket connection
    const newWs = new WebSocket(process.env.REACT_APP_WS_URL);

    newWs.onopen = () => {
      // Once the connection is open, send the session ID to register
      if (sessionId) {
        newWs.send(JSON.stringify({ type: "register", sessionId }));
      }
    };

    newWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.messages) {
          data.messages.splice(0, 1);
          setMessages(data.messages);
        }
      } catch (e) {
        console.error("WebSocket message error:", e);
      }
    };

    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newWs.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Update the state with the new WebSocket connection
    setWs(newWs);
  };

  useEffect(() => {
    // Call initWebSocket without session ID on component mount
    initWebSocket(null);
    // Ensure WebSocket is closed when component unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    async function init() {
      const sessionLoaded = localStorage.getItem("sessionLoaded");
      if ((sessionLoaded === "") | (sessionLoaded === null)) {
        if (topicTitle) {
          console.log("yes new session");
          StartSession();
        } else {
          if (sessionsr && sessionsr.length > 0) {
            loadSession(sessionsr[0]);
            setSessions(sessionsr);
          } else {
            await fetchSessions();
            loadSession(sessions[0]);
          }
        }
      } else {
        await loadSession(JSON.parse(sessionLoaded));
        await fetchSessions();
      }
    }

    init();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchSessions() {
    // console.log("called fetch sessions");
    const result = await getSessions(showToast);
    if (result.success) {
      setSessions(result.data);
    } else {
      if (result.logout) logout();
    }
  }

  async function StartSession() {
    // console.log("called start session");
    const result = await startSession(topicTitle, showToast);
    if (result.success) {
      const sessions = result.data;
      setSessions(sessions);
      // setSelectedSession(sessions[0]);
      await loadSession(sessions[0]);
      await sendChat(true, sessions[0]);
      // localStorage.setItem("sessionLoaded", JSON.stringify(sessions[0]));
    } else {
      if (result.logout) logout();
    }
  }

  async function loadSession(session) {
    setSelectedSession(session);
    initWebSocket(session._id);
    localStorage.setItem("sessionLoaded", JSON.stringify(session));
    const result = await LoadSession(session, showToast);
    if (result.success) {
      setMessages(result.data);
    } else {
      if (result.logout) logout();
    }
  }

  async function sendChat(analyse, session) {
    // console.log("called send chat");
    const result = await aiChat(
      analyse,
      session,
      getPrompt,
      userInput,
      setUserInput,
      showToast
    );
    if (!result.success) {
      if (result.logout) logout();
    }
  }

  function UserSessionsDiv({ isVisible }) {
    const visibilityClass = isVisible ? "" : "hidden";
    return (
      <div
        id="sessions"
        className={`${visibilityClass} h-full md:hide-scrollbar md:block md:w-64 min-w-64 flex-shrink-0 bg-gray-200 overflow-y-auto`}
      >
        <ChatSessions
          sessions={sessions}
          selectedSession={selectedSession}
          onSelectSession={loadSession}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          setDotClickedSesh={setDotClickedSesh}
          showedit={() => {
            setEditSessionLayout(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgc font-sans">
      {editSessionlayout && (
        <EditSession
          onClosedialog={() => {
            setEditSessionLayout(false);
          }}
          session={dotclickedsesh}
          updateSesh={setSessions}
          logout={logout}
          toast={showToast}
        />
      )}
      <div
        className={`fixed inset-0 z-30 transition-opacity ${
          isSidebarOpen ? "bg-black bg-opacity-50 backdrop-blur-sm" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <ChatBar toggleSidebar={toggleSidebar} />
      <div className="flex h-[calc(100vh-52px)]">
        <div
          className={`fixed z-40 inset-y-0 left-0 w-64 transition duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gray-200 overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <UserSessionsDiv isVisible={true} />
        </div>

        <UserSessionsDiv isVisible={false} />

        <div className=" h-parent flex-grow">
          <div className="h-90">
            <MessageSection
              messages={messages}
              messagesEndRef={messagesEndRef}
            />
          </div>
          <MessageInput
            onSendMessage={sendChat}
            selectedSession={selectedSession}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </div>
      </div>

      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

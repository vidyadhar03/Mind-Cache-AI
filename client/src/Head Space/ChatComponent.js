import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditSession from "./EditSession";
import "./ChatComponent.css";

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
      setMessages(json.data);

      console.log(selectedSession);
    } catch (e) {
      console.log(e);
    }
  };

  async function Chat(analyse, session) {
    let input;
    if (analyse) {
      input =
        "take my customer below thoughts and provide me output assuming you are therapist , my thoughts:" +
        JSON.stringify(thoughts);
    } else {
      input = userInput;
    }

    try {
      const response = await fetch("http://localhost:5000/chat", {
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
      const json = await response.json();
      setMessages(json.messages);
      setUserInput("");
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
            time: "some random time hehe",
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
  },[]);


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

      <div className=" bg-slate-200 overflow-y-auto">
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

      <div className="bg-red-100">
        <div className="mx-8 my-4 px-4  bg-white h-3/4 overflow-y-auto">
          {messages.map((msg, index) => (
            <p key={index} className="">
              <div className="text-black font-bold">{msg.role === "user" ? "You: " : "AI: "}</div>
              {msg.content}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex justify-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message"
            className="border-2 rounded-lg"
          />
          <button
            type="submit"
            className="ml-4 bg-blue-100 hover:bg-blue-400 rounded-lg p-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toast } from "../Commons/Toast";
import { getSessions, startSession, LoadSession, aiChat } from "./ChatAPI";

export function Chat() {
  const location = useLocation();
  const topicTitle = location.state?.data;
  const thoughts = location.state?.thoughts;
  const sessionsr = location.state?.sessions;
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  //required state
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [userInput, setUserInput] = useState("");


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

  useEffect(() => {
    if (topicTitle) {
      const sessionLoaded = localStorage.getItem("sessionLoaded");
      if (sessionLoaded === "") {
        StartSession();
      } else {
        LoadSession(JSON.parse(sessionLoaded));
        fetchSessions();
      }
    } else {
      loadSession(sessionsr[0]);
      setSessions(sessionsr);
    }
  }, []);

  async function fetchSessions(){
    const result = await getSessions(showToast);
    if(result.success){
      setSessions(result.data);
    }else{
      if(result.logout) logout();
    }
  }

  async function StartSession() {
    const result = await startSession(topicTitle, showToast);
    if (result.success) {
      const sessions = result.data;
      setSessions(sessions);
      sendChat(true,sessions[0]);
      localStorage.setItem("sessionLoaded", JSON.stringify(sessions[0]));
    } else {
      if (result.logout) logout();
    }
  }

  async function loadSession(session) {
    //make this session selected
    setSelectedSession(session);
    //fetch the session messages and load
    const result = await LoadSession(session, showToast);
    if (result.success) {
      setMessages(result.data);
      console.log(result.data);
    } else {
      if (result.logout) logout();
    }
  }

  async function sendChat(analyse,session){
    const result = await aiChat(analyse,session,getPrompt,userInput, setUserInput,showToast);
    if(!result.success){
      if(result.logout) logout();
    }
  }

  return (
    <div className="h-screen bg-bgc font-sans">


      <div></div>

      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

import { getSubDetails,setSubDetails,isEligible } from "../utils/SubscriptionDetails";
const base_url = process.env.REACT_APP_API_URL;

export async function getSessions(toast) {
  let result = { success: false, data: [], logout: false };
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
      result.logout = true;
      return result;
    }
    if (!response.ok) {
      const json = await response.json();
      toast(json.message);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    result.success = true;
    result.data = json.data.reverse();
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
}

export const LoadSession = async (session, toast) => {
  let result = { success: false, data: [], logout: false };
  try {
    const response = await fetch(base_url + "chatmessages/" + session._id, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("usertoken"),
      },
    });
    if (response.status === 403) {
      result.logout = true;
      return result;
    }
    if (!response.ok) {
      const json = await response.json();
      toast(json.message);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    // console.log(json.data);
    json.data.splice(0, 1);
    // setMessages(json.data);
    result.success = true;
    result.data = json.data;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
};

export const startSession = async (topicTitle,toast) => {
  let result = { success: false, data: [], logout: false };
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
      result.logout = true;
      return result;
    }
    if (!response.ok) {
      const json = await response.json();
      toast(json.message);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    const sessions = json.sessions.reverse();
    // updateSessions(sessions);
    // Chat(true, sessions[0]);
    localStorage.setItem("sessionLoaded", JSON.stringify(sessions[0]));
    result.success = true;
    result.data = sessions;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
};

export async function aiChat(analyse, session, getPrompt, userInput, setUserInput, toast) {
  let result = { success: false, data: [], logout: false };

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
        result.logout = true;
        return result;
      }
      if (!response.ok) {
        const json = await response.json();
        toast(json.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const subDetails = getSubDetails();
      subDetails.aiInteractionCount = json.updatedAICount;
      setSubDetails(subDetails);
    } catch (e) {
      console.log(e);
      return result;
    }
  } else {
    toast(
      "You've hit your AI interaction limit! Keep the conversation going by subscribing."
    );
  }
}

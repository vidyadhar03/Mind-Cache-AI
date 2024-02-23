const base_url = process.env.REACT_APP_API_URL;

export async function AddTopicAPI(newTopic) {
  let result = { success: false, data: [], logout: false };
  try {
    console.log("hitting api");
    const response = await fetch(base_url + "addtopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("usertoken"),
      },

      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        title: newTopic,
        time: new Date().toISOString(),
      }),
    });
    if (response.status === 403) {
      result.logout = true;
      return result;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    result.success = true;
    result.data = json.data;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
}

export async function AddThoughtAPI(topicid, newThought) {
  let result = { success: false, data: [], logout: false };
  try {
    const response = await fetch(base_url + "addthought", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("usertoken"),
      },
      body: JSON.stringify({
        topicid: topicid,
        thought: newThought,
        time: new Date().toISOString(),
      }),
    });
    if (response.status === 403) {
      result.logout = true;
      return result;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    result.success = true;
    result.data = json.data;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
}

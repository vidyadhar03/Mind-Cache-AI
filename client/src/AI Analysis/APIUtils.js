const base_url = process.env.REACT_APP_API_URL;

export async function getSessions() {
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

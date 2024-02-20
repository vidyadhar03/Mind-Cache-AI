import { useState } from "react";
const base_url = process.env.REACT_APP_API_URL;

function EditSession({ onClosedialog, session,updateSesh,logout }) {
  const [edit, setEdit] = useState("");
  const [delconf, setdelconf] = useState(false);
  let del = "no";


  async function UpdateData() {
    try {
      const response = await fetch(base_url+"editchatsession", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("usertoken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: localStorage.getItem("userid"),
          sessionid: session._id,
          edit: edit,
          del: del,
        }),
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json)
      updateSesh(json.data.reverse())
      onClosedialog()
    } catch (e) {
      console.log(e);
    }
  }

  function EditData(){
    if (del === "yes") {
        UpdateData()
    } else {
      if (edit === "") {
        console.log("no change in data");
      }else{
        UpdateData()
      }
    }
  }

  return (
    <div>
      <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="py-4 px-16 bg-white border shadow-xl rounded-lg">
          <div className="flex-col  items-center">
            <div className="text-black font-medium text-xl text-center">
              Edit your Session
            </div>

            <div className=" mt-4 mb-2 flex justify-center">
              <textarea
                className="border-2 p-2 w-parent rounded-md w-96"
                defaultValue={session.sessionTitle}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex justify-center ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 mr-1"
                onClick={() => {
                    EditData();
                }}
              >
                Update
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 ml-1"
                onClick={() => {
                  setdelconf(true);
                }}
              >
                Delete
              </button>
            </div>

            <div className="flex flex-col mt-2">
              {delconf && (
                <button
                  className="w-full bg-red-400 border-2 hover:bg-red-600 text-black font-bold py-2 px-4 rounded "
                  onClick={() => {
                    setdelconf(false);
                    del = "yes";
                    UpdateData();
                  }}
                >
                  Delete chat session for sure?
                </button>
              )}
              <button
                className="w-full bg-white border-2 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded mt-2"
                onClick={() => {
                  onClosedialog();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSession;

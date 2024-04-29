import { useState } from "react";
import { TextField } from "@mui/material";
import { trackEvent } from "../utils/PageTracking";
import { getUserDetails } from "../utils/SubscriptionDetails";

const base_url = process.env.REACT_APP_API_URL;

function EditSession({ onClosedialog, session, updateSesh, logout, toast }) {
  const [edit, setEdit] = useState("");
  const [delconf, setdelconf] = useState(false);
  const userDetails=getUserDetails();
  let del = "no";

  async function UpdateData() {
    try {
      const response = await fetch(base_url + "editchatsession", {
        method: "POST",
        headers: {
          authorization: userDetails.usertoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userDetails.userid,
          sessionid: session._id,
          edit: edit,
          del: del,
        }),
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        // const json = await response.json();
        // setDialogMessage(json.message);
        // setShowDialog(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      // console.log(json);
      updateSesh(json.data.reverse());
      onClosedialog();
    } catch (e) {
      // console.log(e);
    }
  }

  function EditData() {
    if (del === "yes") {
      UpdateData();
    } else {
      if (edit === "") {
        toast("Session title is not updated!");
        // console.log("no change in data");
      } else {
        UpdateData();
      }
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm font-sans">
        <div className="border shadow-xl rounded-lg bg-gray-50 w-11/12 sm:w-96">
          <div className="flex-col  items-center   py-2 sm:py-4 px-4 sm:px-8">
            <div className="text-black font-medium text-base text-center">
              Edit your Session
            </div>

            <div className=" mt-4 mb-2 flex justify-center">
              <TextField
                id="outlined-basic"
                label="Update"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                defaultValue={session.sessionTitle}
                InputLabelProps={{
                  style: { fontFamily: "poppins" },
                }}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-center ">
              <button
                className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg mr-1"
                onClick={() => {
                  trackEvent(
                    "click",
                    "Buttons",
                    "Edit Session",
                    "Edit Session from chat page"
                  );
                  EditData();
                }}
              >
                Update
              </button>

              <button
                className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg ml-1"
                onClick={() => {
                  trackEvent(
                    "click",
                    "Buttons",
                    "Delete",
                    "Delete Session from chat page"
                  );
                  setdelconf(true);
                }}
              >
                Delete
              </button>
            </div>

            <div className="flex flex-col mt-2">
              {delconf && (
                <button
                  className="py-2 flex-1 bg-red-600 hover:bg-red-700 text-white border-2 text-base rounded-lg "
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "Confirm Delete",
                      "Confirm Delete from chat page"
                    );
                    setdelconf(false);
                    del = "yes";
                    UpdateData();
                  }}
                >
                  Delete chat session for sure?
                </button>
              )}

              <button
                className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
                onClick={() => {
                  trackEvent(
                    "click",
                    "Buttons",
                    "Cancel",
                    "Cancel from chat page"
                  );
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

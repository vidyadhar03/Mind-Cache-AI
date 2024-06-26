import { useState } from "react";
import { TextField } from "@mui/material";
import { trackEvent } from "../utils/PageTracking";
import { getUserDetails } from "../utils/SubscriptionDetails";
import { encryptData } from "../utils/Encryption";
const base_url = process.env.REACT_APP_API_URL;

function EditData({
  onClosedialog,
  datamode,
  datapassed,
  topicid,
  emptydata,
  toast,
  decryptThoughts,
  setTopics,
  decryptTopics,
  pinTopics,
  logout,
}) {
  const [edit, setEdit] = useState("");
  const [delconf, setdelconf] = useState(false);
  let del = "no";
  let pin = "";
  let collapse = "";
  let datagot = "";
  const rowsheight = datamode === "topic" ? 1 : 4;
  const widthres = datamode === "topic" ? "w-96" : "w-1/3";
  const userDetails = getUserDetails();

  if (datamode === "topic") {
    datagot = datapassed.title;
  } else {
    datagot = datapassed.thought;
  }

  async function EditData() {
    try {
      let api_url = "";
      let req_body = "";
      if (datamode === "topic") {
        api_url = base_url + "updatetopic";
        const topic_title = await encryptData(datapassed.title);
        const topic_edited = await encryptData(edit);
        req_body = JSON.stringify({
          userid: userDetails.userid,
          topicid: datapassed._id,
          title: topic_title,
          edit: topic_edited,
          del: del,
          pin: pin,
        });
      } else {
        api_url = base_url + "updatethought";
        const encryptedThought = await encryptData(datapassed.thought);
        const encryptedEditedThought = await encryptData(edit);
        req_body = JSON.stringify({
          topicid: topicid,
          thoughtid: datapassed._id,
          thought: encryptedThought,
          edit: encryptedEditedThought,
          del: del,
          collapse: collapse,
        });
      }
      // console.log(req_body);
      const response = await fetch(api_url, {
        method: "POST",
        body: req_body,
        headers: {
          authorization: userDetails.usertoken,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        const json = await response.json();
        toast(json.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.data.length === 0) {
        emptydata(true);
      }
      if (datamode === "topic") {
        const decryptedTopics = await decryptTopics(json.data);
        setTopics(pinTopics(decryptedTopics));
      } else {
        await decryptThoughts(json.data);
      }
      del = "no";
      pin = "";
      onClosedialog();
    } catch (e) {
      // console.log(e);
      toast("something went wrong, try again later!");
    }
  }

  function UpdateData() {
    if (
      del === "yes" ||
      pin === "yes" ||
      pin === "no" ||
      collapse === "yes" ||
      collapse === "no"
    ) {
      EditData();
    } else {
      if (edit === "") {
        if (datamode === "topic") {
          toast("Focus Area is not updated!");
        } else {
          toast("Reflection is not updated!");
        }
      } else {
        EditData();
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans">
      <div
        className={` border shadow-xl rounded-lg bg-gray-50 w-11/12 sm:${widthres}`}
      >
        <div className="flex-col  items-center   py-2 sm:py-4 px-4 sm:px-8">
          <div className="text-black font-medium text-base text-center">
            Edit your {datamode === "topic" ? "Focus Area" : "Reflection"}
          </div>

          <div className=" mt-4 mb-2 flex justify-center">
            <TextField
              id="outlined-basic"
              label="Update"
              variant="outlined"
              multiline
              rows={rowsheight}
              fullWidth
              defaultValue={datagot}
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
                UpdateData();
                trackEvent(
                  "click",
                  "Buttons",
                  "Update",
                  "Update clicked from edit data page"
                );
              }}
            >
              Update
            </button>

            <button
              className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg ml-1"
              onClick={() => {
                setdelconf(true);
                trackEvent(
                  "click",
                  "Buttons",
                  "Delete",
                  "Delete clicked from edit data page"
                );
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
                  setdelconf(false);
                  del = "yes";
                  UpdateData();
                  trackEvent(
                    "click",
                    "Buttons",
                    "Confirm Delete",
                    "COnfirm Delete clicked from edit data page"
                  );
                }}
              >
                Delete for sure?
              </button>
            )}
            {datamode === "topic" ? (
              <button
                className="py-2 flex-1 flex justify-center bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
                onClick={() => {
                  pin = datapassed.pinned ? "no" : "yes";
                  UpdateData();
                  trackEvent(
                    "click",
                    "Buttons",
                    "Pin/Unpin",
                    "Pin/Unpin clicked from edit data page"
                  );
                }}
              >
                <img src="/pinned.png" className="h-6 w-6 mr-2" alt="" />
                <div>{datapassed.pinned ? "Unpin" : "Pin"}</div>
              </button>
            ) : (
              <button
                className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
                onClick={() => {
                  collapse = datapassed.collapse ? "no" : "yes";
                  UpdateData();
                  trackEvent(
                    "click",
                    "Buttons",
                    "Show/Hide",
                    "Show/Hide clicked from edit data page"
                  );
                }}
              >
                <div>
                  {datapassed.collapse ? "Show Reflection" : "Hide Reflection"}
                </div>
              </button>
            )}
            <button
              className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
              onClick={() => {
                onClosedialog();
                trackEvent(
                  "click",
                  "Buttons",
                  "Cancel",
                  "Cancel clicked from edit data page"
                );
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditData;

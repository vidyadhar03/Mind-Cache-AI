import { useState, useContext } from "react";
import { DataContext } from "../utils/DataContext";
import { TextField } from "@mui/material";
const base_url = process.env.REACT_APP_API_URL;

function EditData({
  onClosedialog,
  datamode,
  datapassed,
  topicid,
  emptydata,
  toast,
  setThoughts,
  setTopics,
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
        req_body = JSON.stringify({
          userid: localStorage.getItem("userid"),
          title: datapassed.title,
          edit: edit,
          del: del,
          pin: pin,
        });
      } else {
        api_url = base_url + "updatethought";
        req_body = JSON.stringify({
          topicid: topicid,
          thought: datapassed.thought,
          edit: edit,
          del: del,
          collapse: collapse
        });
      }
      console.log(req_body);
      const response = await fetch(api_url, {
        method: "POST",
        body: req_body,
        headers: {
          authorization: localStorage.getItem("usertoken"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.data.length === 0) {
        emptydata(true);
      }
      if (datamode === "topic") {
        setTopics(pinTopics(json.data));
      } else {
        setThoughts(json.data);
      }
      del = "no";
      pin = "";
      onClosedialog();
    } catch (e) {
      console.log(e);
      toast("something went wrong, try again later!");
    }
  }

  function UpdateData() {
    if (del === "yes" || pin === "yes" || pin==="no"|| collapse === "yes" || collapse ==="no") {
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
              }}
            >
              Update
            </button>

            <button
              className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg ml-1"
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
                className="py-2 flex-1 bg-red-600 hover:bg-red-700 text-white border-2 text-base rounded-lg "
                onClick={() => {
                  setdelconf(false);
                  del = "yes";
                  UpdateData();
                }}
              >
                Delete for sure?
              </button>
            )}
            {datamode === "topic" ? (
              <button
                className="py-2 flex-1 flex justify-center bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
                onClick={() => {
                  pin = (datapassed.pinned)?"no":"yes";
                  UpdateData();
                }}
              >
                <img src="/pinned.png" className="h-6 w-6 mr-2" />
                <div>{(datapassed.pinned)?"Unpin":"Pin"}</div>
              </button>
            ) : (
              <button
                className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
                onClick={()=>{
                  collapse = (datapassed.collapse)?"no":"yes";
                  UpdateData();
                }}
              >
                <div>{(datapassed.collapse)?"Show Reflection":"Collapse"}</div>
              </button>
            )}
            <button
              className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
              onClick={onClosedialog}
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

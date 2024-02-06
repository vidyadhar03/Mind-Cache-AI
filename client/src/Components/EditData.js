import { useState, useContext } from "react";
import { DataContext } from "../utils/DataContext";
import { TextField } from "@mui/material";
const base_url = process.env.REACT_APP_API_URL;

function EditData({ onClosedialog, datamode, datapassed, topicid, emptydata,toast }) {
  const { setTopics, setThoughts } = useContext(DataContext);

  const [edit, setEdit] = useState("");
  const [delconf, setdelconf] = useState(false);
  let del = "no";
  let datagot = "";
  const rowsheight = (datamode==="topic") ? 1 : 4;
  const widthres = (datamode==="topic") ? "w-96" : "w-1/3";

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
        api_url = base_url+"updatetopic";
        req_body = JSON.stringify({
          userid: localStorage.getItem("userid"),
          title: datapassed.title,
          edit: edit,
          del: del,
        });
      } else {
        api_url = base_url+"updatethought";
        req_body = JSON.stringify({
          topicid: topicid,
          thought: datapassed.thought,
          edit: edit,
          del: del,
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if(json.data.length===0){emptydata(true);}
      if (datamode === "topic") {
        setTopics(json.data);
      } else {
        setThoughts(json.data);
      }
      del = "no";
      onClosedialog();
    } catch (e) {
      console.log(e);
      toast("something went wrong, try again later!")
    }
  }

  function UpdateData() {
    if (del === "yes") {
        EditData()
    } else {
      if (edit === "") {
        if (datamode === "topic") {
          toast("Focus Area is not updated!");
        } else {
          toast("Reflection is not updated!");
        }
      }else{
        EditData()
      }
    }
  }

  return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans">
        <div className={ ` border shadow-xl rounded-lg bg-gray-50 w-11/12 sm:${widthres}`}>

          <div className="flex-col  items-center   py-2 sm:py-4 px-4 sm:px-8" >
            <div className="text-black font-medium text-base text-center">
              Edit your {datamode==="topic"?"Focus Area":"Reflection"}
            </div>

            <div className=" mt-4 mb-2 flex justify-center">
              {/* <textarea
                placeholder="Topic"
                className={`${visibilityClass} border-2 p-2 rounded-md w-full`}
                defaultValue={datagot}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              ></textarea> */}
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
                  // className="w-full bg-red-400 border-2 hover:bg-red-600 text-black font-bold py-2 px-4 rounded "
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
              <button
                // className="w-full bg-white border-2 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded mt-2"
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

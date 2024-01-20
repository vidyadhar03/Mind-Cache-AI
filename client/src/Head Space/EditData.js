import { useState, useContext } from "react";
import { DataContext } from "../utils/DataContext";

function EditData({ onClosedialog, datamode, datapassed, topicid, emptydata }) {
  const { setTopics, setThoughts } = useContext(DataContext);

  const [edit, setEdit] = useState("");
  const [delconf, setdelconf] = useState(false);
  let del = "no";
  let datagot = "";

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
        api_url = "http://localhost:3001/updatetopic";
        req_body = JSON.stringify({
          userid: localStorage.getItem("userid"),
          title: datapassed.title,
          edit: edit,
          del: del,
        });
      } else {
        api_url = "http://localhost:3001/updatethought";
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
    }
  }

  function UpdateData() {
    if (del === "yes") {
        EditData()
    } else {
      if (edit === "") {
        console.log("no change in data");
      }else{
        EditData()
      }
    }
  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="py-4 px-16 bg-white border shadow-xl rounded-lg">
          <div className="flex-col  items-center">
            <div className="text-black font-medium text-xl text-center">
              Edit your {datamode}
            </div>

            <div className=" mt-4 mb-2 flex justify-center">
              <textarea
                placeholder="Topic"
                className="border-2 p-2 w-parent rounded-md w-96"
                defaultValue={datagot}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex justify-center ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 mr-1"
                onClick={() => {
                  UpdateData();
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
                  Delete {datamode} for sure?
                </button>
              )}
              <button
                className="w-full bg-white border-2 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded mt-2"
                onClick={onClosedialog}
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

export default EditData;

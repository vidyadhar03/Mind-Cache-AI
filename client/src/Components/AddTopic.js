import { useState } from "react";
import { AddTopicAPI } from "../utils/Api";
import { TextField } from "@mui/material";
import { trackEvent } from "../utils/PageTracking";

function AddTopic({ onClosedialog, toast,pinTopics,setTopics,logout }) {
  const [newTopic,setNewTopic] = useState("");

  async function handleCreate(event) {
    trackEvent(
      "click",
      "Buttons",
      "Add",
      "Add from add topic layout"
    );
    event.preventDefault();
    if (newTopic !== "") {
      const result = await AddTopicAPI(newTopic,toast);
      console.log(result);
      if (result.success) {
        setNewTopic("");
        setTopics(pinTopics(result.data));
        onClosedialog();
      } else {
        if (result.logout) {
          logout();
        } 
      }
    } else {
      toast("Focus Area is empty!");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans">
      <div className="py-2 mx-4 sm:py-4 px-4 sm:px-8 bg-gray-50 border shadow-xl rounded-lg w-11/12 sm:w-96">
        <form className="flex-col  items-center" onSubmit={handleCreate}>
          <div className="text-black font-medium text-base text-center">
            What's been on your mind recently? Name your new focus area.
          </div>

          <div className=" mt-4 mb-2 flex items-center">
            <TextField
              id="outlined-basic"
              label="Focus Area"
              variant="outlined"
              InputLabelProps={{
                style: { fontFamily: "poppins", width: "100%" },
              }}
              value={newTopic}
              fullWidth
              onChange={(e) => (setNewTopic(e.target.value))}
            />
          </div>

          <div className="flex justify-center ">
            <button
              className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg  "
              type="submit"
            >
              Add
            </button>

            <button
              className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg ml-2"
              onClick={()=>{
                onClosedialog();
                trackEvent(
                  "click",
                  "Buttons",
                  "Cancel",
                  "Cancel clicked from add topic layout"
                );
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTopic;

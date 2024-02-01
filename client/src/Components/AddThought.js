import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddThoughtAPI } from "../utils/Api";
import { TextField } from "@mui/material";

function AddThought({ onClosedialog, topic }) {
  const { setThoughts } = useContext(DataContext);
  let newThought = "";

  async function handleCreate() {
    if (newThought !== "") {
      const result = await AddThoughtAPI(topic._id, newThought);
      console.log(result);
      if (result.success) {
        setThoughts(result.data);
        onClosedialog();
      }
    } else {
      console.log("add thought first ");
    }
  }

  const addNewThought = (event) => {
    newThought = event.target.value;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans">
      <div className="py-2 mx-4 sm:py-4 px-4 sm:px-8 bg-gray-50 border shadow-xl rounded-lg w-11/12 sm:w-1/3">
        <div className="flex-col  items-center">
          <div className="text-black font-medium text-base text-center">
            Take a moment to center yourself and reflect on this focus area{" "}
            <span className="font-semibold">{topic.title}</span>. What insights or ideas come to mind? Jot
            down your thoughts here.
          </div>

          <div className=" mt-4 mb-2 flex items-center">
            {/* <textarea
              placeholder="Enter your thought here"
              className="border-2 p-2 rounded-md w-full h-40"
              onChange={addNewThought}
            ></textarea> */}
            <TextField
              id="outlined-basic"
              label="Reflection"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "poppins" },
              }}
              onChange={addNewThought}
            />
          </div>

          <div className="flex justify-center ">
            <button
              className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg  "
              onClick={() => {
                handleCreate();
              }}
            >
              Add
            </button>

            <button
              className="py-2 flex-1 bg-white hover:bg-blue-100 text-black border-2 text-base rounded-lg ml-2"
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

export default AddThought;

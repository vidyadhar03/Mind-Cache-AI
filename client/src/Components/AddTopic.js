import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddTopicAPI } from "../utils/Api";
import { TextField } from "@mui/material";

function AddTopic({ onClosedialog }) {
  const { setTopics } = useContext(DataContext);
  let newTopic = "";

  async function handleCreate(event) {
    event.preventDefault();
    if (newTopic !== "") {
      const result = await AddTopicAPI(newTopic);
      console.log(result);
      if (result.success) {
        setTopics(result.data);
        onClosedialog();
      }
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
            {/* <input
              placeholder="Topic"
              className="border-2 p-2 w-parent rounded-md w-full"
              onChange={(e) => {
                newTopic = e.target.value;
              }}
            ></input> */}
            <TextField
              id="outlined-basic"
              label="Focus Area"
              variant="outlined"
              InputLabelProps={{
                style: { fontFamily: "poppins", width: "100%" },
              }}
              fullWidth
              onChange={(e) => (newTopic = e.target.value)}
            />
          </div>

          <div className="flex justify-center ">
            <button
              className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg  "
              // onClick={() => {
              //   handleCreate();
              // }}
              type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default AddTopic;

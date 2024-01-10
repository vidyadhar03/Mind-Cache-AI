import { DataContext } from "../utils/DataContext";
import { useContext } from "react";

function AddTopic({ onClosedialog }) {
  const { setTopics } = useContext(DataContext);
  let newTopic = "";

  async function handleSubmit() {
    if (newTopic === "") {
      console.log("it is empty");
      //todo - update UI when topic input is empty
    } else {
      try {
        const response = await fetch("http://localhost:3001/addtopic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("usertoken"),
          },
          body: JSON.stringify({
            userid: localStorage.getItem("userid"),
            title: newTopic,
            time: "present date and time",
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setTopics(json.data);
        onClosedialog();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="py-8 px-24 bg-white border shadow-xl rounded-lg">
        <div className="flex-col  items-center">
          <div className="text-black font-medium text-xl">
            Add a topic which is occupying your mind lately
          </div>

          <div className=" mt-4 mb-2 flex justify-center">
            <input
              placeholder="Topic"
              className="border-2 p-2 w-parent rounded-md w-full"
              onChange={(e) => {
                newTopic = e.target.value;
              }}
            ></input>
          </div>

          <div className="flex justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Topic
            </button>

            <button
              className="bg-white border-2 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded ml-2"
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

export default AddTopic;
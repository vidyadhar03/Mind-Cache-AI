import { useNavigate } from "react-router-dom";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";

function AddThought({ onClosedialog,topic }) {
  const {  setThoughts } = useContext(DataContext);
  const navigate = useNavigate();
  let newThought = "";

  console.log(topic)

  async function handleSubmit() {
    if (newThought === "") {
      console.log("it is empty");
      
    } else {

      try {
        const response = await fetch("http://localhost:3001/addthought", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("usertoken"),
          },
          body: JSON.stringify({
            topicid: topic._id,
            thought: newThought,
            time: "present date and time",
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setThoughts(json.data);
        onClosedialog();
      } catch (e) {
        console.log(e);
      }

    }
  }

  const addNewThought = (event) => {
    newThought = event.target.value;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="py-8 px-24 bg-white border shadow-xl rounded-lg">
        <div className="flex-col  items-center">
          <div className="text-black font-medium text-xl">
            Add a thought to the {topic.title} topic to easy track
          </div>

          <div className=" mt-4 mb-2 flex justify-center">
            <textarea
              placeholder="Enter your thought here"
              className="border-2 p-2 rounded-md w-full h-40"
              onChange={addNewThought}
            ></textarea>
          </div>

          <div className="flex justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Thought
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

export default AddThought;

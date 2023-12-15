import { useNavigate } from "react-router-dom";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";

function AddThought({ onClosedialog,topic }) {
  const { topics, setTopics } = useContext(DataContext);
  const navigate = useNavigate();
  let newThought = "";

  function handleSubmit() {
    if (newThought === "") {
      console.log("it is emoty");
      
    } else {
      console.log("adding to topics data");
      //adding new topic to the topics array
      const newThoughtObject = {
        thought: newThought,
        time: "15-12-2023 15:00"
      };

      const index = topics.findIndex(topicx=>topicx.title===topic)

      topics[index].thoughts.push(newThoughtObject)
      console.log(topics);
      setTopics(topics)
      onClosedialog()
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
            Add a thought to the {topic} topic to easy track
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

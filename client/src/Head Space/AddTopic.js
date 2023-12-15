import { useNavigate } from "react-router-dom";
import { DataContext } from "../utils/DataContext";
import { useContext, useState } from "react";

function AddTopic({ onClosedialog }) {
  const { topics, setTopics } = useContext(DataContext);
  const navigate = useNavigate();
  let newTopic = "";

  function handleSubmit() {
    navigate("/headspace/topics");

    if (newTopic === "") {
      console.log("it is emoty");
      
    } else {
      console.log("adding to topics data");
      //adding new topic to the topics array
      const newTopicObject = {
        title: newTopic,
        time: "15-12-2023 15:00",
        thoughts: [],
        index: "0",
      };
      topics.push(newTopicObject)
      console.log(topics);
      setTopics(topics)
      onClosedialog()
    }
  }

  const addNewTopic = (event) => {
    newTopic = event.target.value;
  };

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
              onChange={addNewTopic}
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

import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddThoughtAPI } from "../utils/Api";

function AddThought({ onClosedialog,topic }) {
  const {  setThoughts } = useContext(DataContext);
  let newThought = "";

  async function handleCreate(){
    if(newThought!==""){
      const result = await AddThoughtAPI(topic._id,newThought)
      console.log(result)
      if(result.success){
        setThoughts(result.data)
        onClosedialog();
      }
    }else{
      console.log("add thought first ")
    }
  }

  const addNewThought = (event) => {
    newThought = event.target.value;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans">
      <div className="py-2 mx-4 sm:py-4 px-4 sm:px-8 bg-gray-50 sm:w-1/2 border shadow-xl rounded-lg text-center">
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
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => {
                handleCreate();
              }}
            >
              Add Thought
            </button>

            <button
              className="flex-1 bg-white border-2 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded ml-2"
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

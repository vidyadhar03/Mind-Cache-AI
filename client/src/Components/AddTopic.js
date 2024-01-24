import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddTopicAPI } from "../utils/Api";


function AddTopic({ onClosedialog }) {
  const { setTopics } = useContext(DataContext);
  let newTopic = "";

  async function handleCreate(){
    if(newTopic!==""){
      const result = await AddTopicAPI(newTopic)
      console.log(result)
      if(result.success){
        setTopics(result.data)
        onClosedialog();
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="py-2 mx-4 sm:py-4 px-4 sm:px-8 bg-white border shadow-xl rounded-lg">
        <div className="flex-col  items-center">
          <div className="text-black font-medium text-lg sm:text-xl text-center">
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
                handleCreate()
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

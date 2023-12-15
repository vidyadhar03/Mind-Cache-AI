import { DataContext } from "../utils/DataContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTopic from "./AddTopic";

function Topics() {
  const { topics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const navigate = useNavigate();

  const handleopen = () => {
    setshowaddtopic(true);
  };

  const handleclose = () => {
    setshowaddtopic(false);
  };

  return (
    <div className="">
      {showaddtopic && <AddTopic onClosedialog={handleclose} />}
      <div className="grid grid-cols-4 gap-2">
        {topics.map((topic, index) => (
          <div
            className="bg-blue-200 mt-8 mx-4 px-12 py-24 text-center rounded-md text-black font-medium"
            onClick={() => {
              navigate(`/headspace/topics/${topic.title.replace(/ /g, '')}`);
            }}
          >
            {topic.title}
          </div>
        ))}
      </div>
      <div
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={handleopen}
      >
        + Add Topic
      </div>
    </div>
  );
}

export default Topics;

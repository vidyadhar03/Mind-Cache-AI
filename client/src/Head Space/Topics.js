import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTopic from "./AddTopic";

function Topics() {
  const { topics, setTopics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const navigate = useNavigate();

  const handleopen = () => {
    setshowaddtopic(true);
  };

  const handleclose = () => {
    setshowaddtopic(false);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/topics/" + localStorage.getItem("userid"),
          {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("usertoken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setTopics(json.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTopics();
  }, []);

  if (topics.length === 0) {
    return (
      <div>
        {showaddtopic && <AddTopic onClosedialog={handleclose} />}

        <div className="text-3xl text-black flex justify-center p-16">
          Loading...
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



  return (
    <div className="">
      {showaddtopic && <AddTopic onClosedialog={handleclose} />}

      <div className="grid grid-cols-4 gap-2">
        {topics.map((topic, index) => (
          <div
            className="bg-blue-200 mt-8 mx-4 px-12 py-24 text-center rounded-md text-black font-medium cursor-pointer"
            onClick={() => {
              navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                state: { data: topic },
              });
            }}
            key={index}
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

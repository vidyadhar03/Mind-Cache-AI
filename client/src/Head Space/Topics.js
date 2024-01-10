import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTopic from "./AddTopic";
import EditData from "./EditData";

function Topics() {
  const { topics, setTopics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const [showedittopic, setshowedittopic] = useState(false);
  const [selectedtopic,setSelectedtopic] = useState(null);
  const navigate = useNavigate();

  const handleeditclose = () => {
    setshowedittopic(false);
  };

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
      {showedittopic && <EditData onClosedialog={handleeditclose} datamode={"topic"} datapassed={selectedtopic} topicid={selectedtopic._id}/>}

      <div className="grid grid-cols-4 gap-2">
        {topics.map((topic, index) => (
          <div
            className="bg-blue-200 mt-8 mx-4  text-center rounded-md cursor-pointer shadow-lg hover:shadow-2xl"
            key={index}
          >
          

            <div className="flex justify-end">
              <img
                className="h-4 w-4 m-2"
                src="./editlogo.png"
                onClick={()=>{
                  setSelectedtopic(topic);
                  setshowedittopic(true);
                }}
              />
            </div>
            <div
              className="px-12 py-24 text-black text-2xl font-bold"
              onClick={() => {
                navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                  state: { data: topic },
                });
              }}
            >
              {topic.title}
            </div>
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

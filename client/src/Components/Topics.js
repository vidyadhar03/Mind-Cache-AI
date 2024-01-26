import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopicLanding from "./TopicLanding";
import AddTopic from "./AddTopic";
import EditData from "./EditData";
const base_url = process.env.REACT_APP_API_URL;

function Topics() {
  const { topics, setTopics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const [showedittopic, setshowedittopic] = useState(false);
  const [selectedtopic, setSelectedtopic] = useState(null);
  const [emptytopics, setEmptyTopics] = useState(false);
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
          base_url+"topics/" + localStorage.getItem("userid"),
          {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("usertoken"),
            },
          }
        );
        if (response.status === 403) {
          localStorage.removeItem("userid");
          localStorage.removeItem("usertoken");
          navigate("/");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.data.length === 0) {
          setEmptyTopics(true);
        }
        setTopics(json.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTopics();
  }, []);

  if (emptytopics === false && topics.length === 0) {
    return (
      <div>
        <div className="text-3xl text-black flex justify-center p-16">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 p-2">
      {showaddtopic && <AddTopic onClosedialog={handleclose} />}
      {showedittopic && (
        <EditData
          onClosedialog={handleeditclose}
          datamode={"topic"}
          datapassed={selectedtopic}
          topicid={selectedtopic._id}
          emptydata={setEmptyTopics}
        />
      )}

      {emptytopics ? (
        <TopicLanding emptydata={setEmptyTopics} />
      ) : (
        <div>
          <div className="w-full h-20 flex justify-center items-center bg-blue-200">
            TOPICS Intro section
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-2">
            {topics.map((topic, index) => (
              <div
                key={index}
                className=" bg-blue-300 h-48 md:h-56 rounded-lg shadow-md hover:shadow-lg "
              >
                <div
                  className="px-4 py-8 h-5/6 font-medium text-gray text-base sm:text-lg md:text-xl text-center flex justify-center items-center cursor-pointer overflow-hidden whitespace-normal"
                  onClick={() => {
                    navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                      state: { data: topic },
                    });
                  }}
                >
                  {topic.title}
                </div>
                <div className="h-1/6 flex justify-between items-center px-2 border-t border-blue-400">
                  <div className="text-xs">{topic.time}</div>
                  <div>
                    <img
                      src="/editlogo.png"
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => {
                        setSelectedtopic(topic);
                        setshowedittopic(true);
                      }}
                    />
                  </div>
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
      )}
    </div>
  );

  return (
    <div className="font-sans">
      {showaddtopic && <AddTopic onClosedialog={handleclose} />}
      {showedittopic && (
        <EditData
          onClosedialog={handleeditclose}
          datamode={"topic"}
          datapassed={selectedtopic}
          topicid={selectedtopic._id}
          emptydata={setEmptyTopics}
        />
      )}

      {emptytopics ? (
        <TopicLanding emptydata={setEmptyTopics} />
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {topics.map((topic, index) => (
              <div
                className="flex flex-col flex-wrap bg-blue-200 mt-8 mx-4  text-center rounded-md cursor-pointer shadow-lg hover:shadow-2xl"
                key={index}
              >
                <div className="flex justify-end">
                  <img
                    className="h-4 w-4 m-2"
                    src="./editlogo.png"
                    onClick={() => {
                      setSelectedtopic(topic);
                      setshowedittopic(true);
                    }}
                  />
                </div>

                <div
                  className="bg-pink-200 h-full flex flex-col justify-center items-center px-6 py-8 text-black text-2xl font-bold overflow-hidden whitespace-normal"
                  onClick={() => {
                    navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                      state: { data: topic },
                    });
                  }}
                >
                  <div className="flex flex-wrap">{topic.title}</div>
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
      )}
    </div>
  );
}

export default Topics;

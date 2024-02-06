import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopicLanding from "./TopicLanding";
import AddTopic from "./AddTopic";
import EditData from "./EditData";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
const base_url = process.env.REACT_APP_API_URL;

function Topics() {
  const { topics, setTopics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const [showedittopic, setshowedittopic] = useState(false);
  const [selectedtopic, setSelectedtopic] = useState(null);
  const [emptytopics, setEmptyTopics] = useState(false);
  //dialog
  const [showDialog, setShowDialog] = useState(true);
  const [dialogMessage, setDialogMessage] = useState("");
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

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  useEffect(() => {
    console.log("topics mount");
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          base_url + "topics/" + localStorage.getItem("userid"),
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
        {/* <div className="text-3xl text-black flex justify-center p-16">
          Loading...
        </div> */}
        <Loader/>
      </div>
    );
  }

  return (
    <div className="font-sans bg-bgc p-2 min-h-[calc(100vh-60px)]">
      {showaddtopic && <AddTopic onClosedialog={handleclose} toast={showToast} />}
      {showedittopic && (
        <EditData
          onClosedialog={handleeditclose}
          datamode={"topic"}
          datapassed={selectedtopic}
          topicid={selectedtopic._id}
          emptydata={setEmptyTopics}
          toast={showToast}
        />
      )}

      {emptytopics ? (
        <TopicLanding emptydata={setEmptyTopics} toast={showToast}/>
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
            className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-base px-4 py-2 rounded-full shadow-lg cursor-pointer"
            onClick={handleopen}
          >
            + Add Focus Area
          </div>
        </div>
      )}

      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

export default Topics;

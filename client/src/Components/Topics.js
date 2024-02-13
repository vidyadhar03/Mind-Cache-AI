import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopicLanding from "./TopicLanding";
import AddTopic from "./AddTopic";
import EditData from "./EditData";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import { smoothifyDate } from "../utils/DateUtils";
const base_url = process.env.REACT_APP_API_URL;

function Topics() {
  const { topics, setTopics } = useContext(DataContext);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const [showedittopic, setshowedittopic] = useState(false);
  const [selectedtopic, setSelectedtopic] = useState(null);
  const [emptytopics, setEmptyTopics] = useState(false);
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();
  //grid dynamic style
  const gridcolstyle =
    topics.length > 4
      ? "grid-cols-2  lg:grid-cols-4"
      : "grid-cols-1  lg:grid-cols-2";

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
        <Loader />
      </div>
    );
  }

  return (
    <div className="font-sans bg-bgc min-h-[calc(100vh-60px)]">
      {showaddtopic && (
        <AddTopic onClosedialog={handleclose} toast={showToast} />
      )}
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
        <TopicLanding emptydata={setEmptyTopics} toast={showToast} />
      ) : (
        <div>
          <div className="sticky top-0 z-60 bg-bgc font-sans shadow-md  px-4 py-2">
            <div className="w-parent flex flex-row justify-between  ">
              <div className="flex">
                <img
                  src="/mindcachelogo.png"
                  className="h-8 w-8 rounded-full mr-2"
                  alt="logo"
                />
                <div className="my-auto text-black text-xl text-justify  ">
                  Mind Cache AI
                </div>
              </div>

              <button
                className="flex items-center justify-center "
                onClick={() => {
                  navigate(`/account`);
                }}
              >
                <img src="/user-profile-new.png" className="h-8 w-8 " alt="" />
              </button>
            </div>

            <div className="w-full mt-6 flex flex-col">
              <div className="flex  text-black text-2xl md:text-3xl">
                Explore Your Focus Areas
              </div>
              <div className="w-full flex mt-4 mb-2">
                <div className="px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer">
                  <img src="/sort.png" className="h-4 w-auto mr-1" alt=""/> 
                  <div>Sort</div>
                </div>
                <div className="ml-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer">
                  <img src="/info.png" className="h-4 w-auto mr-1" alt="" />  
                  <div>Info.</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-2 grid gap-4 mt-2 ${gridcolstyle}`}>
            {topics.map((topic, index) => (
              <div
                key={index}
                className=" bg-[#89CFF0] border border-[#A8D5BA] min-h-48 lg:min-h-56 rounded-lg shadow-md hover:shadow-lg "
              >
                <div
                  className="px-4 lg:px-8 py-12 lg:py-28  h-5/6 text-gray text-lg lg:text-xl text-center flex justify-center items-center cursor-pointer overflow-hidden whitespace-normal"
                  onClick={() => {
                    navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                      state: { data: topic },
                    });
                  }}
                >
                  {topic.title}
                </div>
                <div className="h-1/6 flex justify-between items-center py-2 border-t border-blue-400">
                  <div className="text-xs ml-2">
                    {smoothifyDate(topic.time.toString())}
                  </div>
                  <div>
                    <img
                      src="/editpen.svg"
                      className="h-4 w-4 cursor-pointer mr-2"
                      alt=""
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

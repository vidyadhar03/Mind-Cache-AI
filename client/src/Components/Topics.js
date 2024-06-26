import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopicLanding from "./TopicLanding";
import AddTopic from "./AddTopic";
import EditData from "./EditData";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import { smoothifyDate } from "../utils/DateUtils";
import { FocusAreaInfo } from "./FocusInfo";
import { getSubDetails, getUserDetails } from "../utils/SubscriptionDetails";
import { trackEvent } from "../utils/PageTracking";
import { decryptData } from "../utils/Encryption";
const base_url = process.env.REACT_APP_API_URL;

function Topics() {
  const [topics, setTopics] = useState([]);
  const [showaddtopic, setshowaddtopic] = useState(false);
  const [showedittopic, setshowedittopic] = useState(false);
  const [showinfo, setshowinfo] = useState(false);
  const [selectedtopic, setSelectedtopic] = useState(null);
  const [emptytopics, setEmptyTopics] = useState(false);
  const [sort, setSort] = useState(" by latest");
  const subDetails = getSubDetails();
  const userDetails = getUserDetails();
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();
  //grid dynamic style
  const gridcolstyle =
    topics.length > 4
      ? "grid-cols-2  lg:grid-cols-4"
      : "grid-cols-1  lg:grid-cols-2";

  async function decryptTopics(encryptedTopics) {
    for (let topic of encryptedTopics) {
      const decryptedtitle = await decryptData(topic.title);
      if (decryptedtitle !== "" && decryptedtitle !== null) {
        topic.title = decryptedtitle;
      }
    }
    return encryptedTopics;
  }

  function pinTopics(updatedTopics) {
    const { pinned, unpinned } = updatedTopics.reduce(
      (acc, topic) => {
        topic.pinned ? acc.pinned.push(topic) : acc.unpinned.push(topic);
        return acc;
      },
      { pinned: [], unpinned: [] }
    );
    const pinnedTopics = [...pinned, ...unpinned];
    return pinnedTopics;
  }

  async function reverseTopics() {
    trackEvent("click", "Buttons", "Sort Topics", "Sort from topics page");
    const reversedTopics = [...topics].reverse();
    // const decryptedTopics = await decryptTopics(reversedTopics);
    setTopics(pinTopics(reversedTopics));
    setSort(sort === " by latest" ? " by oldest" : " by latest");
  }

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  function logout() {
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          base_url + "topics/" + userDetails.userid,
          {
            method: "GET",
            headers: {
              authorization: userDetails.usertoken,
            },
          }
        );
        if (response.status === 403) {
          logout();
        }
        if (!response.ok) {
          const json = await response.json();
          setDialogMessage(json.message);
          setShowDialog(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.data.length === 0) {
          setEmptyTopics(true);
        }
        // console.log(json.data);
        const decryptedTopics = await decryptTopics(json.data);
        setTopics(pinTopics(decryptedTopics));
      } catch (e) {
        // console.log(e);
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

  function colorGradient() {
    const colors = [
      // "#7F9BD1",
      // "#8CA5D6",
      "#99AEDA",
      "#A5B9DF",
      "#B2C3E3",
      "#BFCCE8",
      "#CCD7EC",
      "#D8E1F1",
      "#E5EBF5",
      // "#F2F5FA",
    ];

    const getRandomColor = () =>
      colors[Math.floor(Math.random() * colors.length)];

    const color1 = getRandomColor();
    const color2 = getRandomColor();

    const gradientStyle = {
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    };

    return gradientStyle;
  }

  function TopicLimit() {
    if (subDetails.isSubscribed) {
      return true;
    } else {
      if (topics.length < 10) {
        return true;
      } else {
        showToast(
          "You've hit the limit for adding Focus Areas. Upgrade now for unlimited access and additional benefits!"
        );
        return false;
      }
    }
  }

  return (
    <div className="font-sans bg-bgc min-h-screen">
      {showaddtopic && (
        <AddTopic
          onClosedialog={() => {
            setshowaddtopic(false);
          }}
          toast={showToast}
          decryptTopics={decryptTopics}
          pinTopics={pinTopics}
          setTopics={setTopics}
          logout={logout}
        />
      )}
      {showedittopic && (
        <EditData
          onClosedialog={() => {
            setshowedittopic(false);
          }}
          datamode={"topic"}
          datapassed={selectedtopic}
          topicid={selectedtopic._id}
          emptydata={setEmptyTopics}
          toast={showToast}
          decryptTopics={decryptTopics}
          pinTopics={pinTopics}
          setTopics={setTopics}
          logout={logout}
        />
      )}
      {showinfo && (
        <FocusAreaInfo
          onClosedialog={() => {
            setshowinfo(false);
          }}
        />
      )}

      {emptytopics ? (
        <TopicLanding
          emptydata={setEmptyTopics}
          toast={showToast}
          decryptTopics={decryptTopics}
          pinTopics={pinTopics}
          setTopics={setTopics}
        />
      ) : (
        <div className="">
          <div className="sticky top-0 z-60 bg-bgc font-sans shadow-md   py-2">
            <div className="w-parent flex flex-row justify-between items-center  px-4">
              <div className="flex">
                <img
                  src="/mindcachelogo.png"
                  className="h-9 w-9 rounded-full mr-2"
                  alt="logo"
                />
                <div className="my-auto text-black text-lg md:text-xl text-justify  ">
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
              <div className="flex  text-black text-xl md:text-3xl px-4">
                Explore Your Focus Areas
              </div>

              <div className="w-full flex mt-2  pl-4 py-1  whitespace-nowrap overflow-x-auto hide-scrollbar">
                <div
                  className="px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-xs md:text-sm flex items-center cursor-pointer"
                  onClick={reverseTopics}
                >
                  <img src="/sort.png" className="h-4 w-auto mr-1" alt="" />
                  <div className="mr-2 md:mr-0">Sort {sort}</div>
                </div>

                <div
                  className="ml-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-xs md:text-sm flex items-center cursor-pointer"
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "AI Analysis History",
                      "AI Analysis History from topics page"
                    );
                    // console.log(topics);
                    navigate("/AIhistory", {
                      state: { data: topics },
                    });
                  }}
                >
                  <div>AI Analysis History</div>
                </div>

                {!subDetails.isSubscribed && (
                  <div
                    className="ml-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-xs md:text-sm flex items-center cursor-pointer"
                    onClick={() => {
                      trackEvent(
                        "click",
                        "Buttons",
                        "Subscribe",
                        "Subscribe from topics page"
                      );

                      navigate(`/pricing`);
                    }}
                  >
                    <div>Subscribe</div>
                  </div>
                )}

                <div
                  className="mx-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-xs md:text-sm flex items-center cursor-pointer"
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "Info",
                      "Info from topics page"
                    );

                    setshowinfo(true);
                  }}
                >
                  <img src="/info.png" className="h-4 w-auto mr-1" alt="" />
                  <div className="mr-2 md:mr-0">Info.</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-2 grid gap-4 mt-2 ${gridcolstyle} pb-16`}>
            {topics.map((topic, index) => (
              <div
                key={index}
                // className=" bg-[#89CFF0] border border-[#A8D5BA] min-h-48 lg:min-h-56 rounded-lg shadow-md hover:shadow-lg "
                style={colorGradient()}
                className=" min-h-48 lg:min-h-56 rounded-lg shadow-md hover:shadow-lg "
              >
                <div
                  className="px-2 lg:px-8 py-12 lg:py-28  h-5/6 text-gray md:text-lg  text-center flex justify-center items-center cursor-pointer overflow-hidden whitespace-normal"
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "Focus Area Click",
                      "Focus Area Click from topics page"
                    );

                    navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                      state: { data: topic },
                    });
                  }}
                >
                  {topic.pinned && (
                    <div className="w-1/5 pl-2">
                      <img src="/pinned.png" className="h-6 w-6 mr-1" alt="" />
                    </div>
                  )}
                  <div className={`w-4/5 ${topic.pinned && "text-left ml-4"}`}>
                    {topic.title}
                  </div>
                </div>
                <div className="h-1/6 flex justify-between items-center py-2 border-t border-gray-600">
                  <div className="text-xs ml-2">
                    {smoothifyDate(topic.time.toString())}
                  </div>
                  <div>
                    <img
                      src="/editpen.svg"
                      className="h-4 w-4 cursor-pointer mr-2"
                      alt=""
                      onClick={() => {
                        trackEvent(
                          "click",
                          "Buttons",
                          "Edit Focus Area",
                          "Edit Focus Area from topics page"
                        );
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
            onClick={() => {
              trackEvent(
                "click",
                "Buttons",
                "Add Focus Area",
                "Add Focus Area from topics page"
              );

              if (TopicLimit()) {
                setshowaddtopic(true);
              }
            }}
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

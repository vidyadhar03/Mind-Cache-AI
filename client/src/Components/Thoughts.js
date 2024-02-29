import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThoughtLanding } from "./ThoughtLanding";
import AddThought from "./AddThought";
import EditData from "./EditData";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import { smoothifyDate } from "../utils/DateUtils";
import { ReflectionInfo } from "./ReflectionInfo";
import { getSubDetails } from "../utils/SubscriptionDetails";
import { trackEvent } from "../utils/PageTracking";
import "./buttonanim.css";
const base_url = process.env.REACT_APP_API_URL;

function Thoughts() {
  const location = useLocation();
  const topicobj = location.state?.data;
  const [thoughts, setThoughts] = useState([]);
  const [showaddthought, setshowaddthought] = useState(false);
  const [showeditthought, setshoweditthought] = useState(false);
  const [showinfo, setshowinfo] = useState(false);
  const [selectedthought, setSelectedthought] = useState(null);
  const [emptythoughts, setEmptyThoughts] = useState(false);
  const [sort, setSort] = useState(" by latest");
  const subDetails = getSubDetails();
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();

  function reverseThoughts() {
    trackEvent(
      "click",
      "Buttons",
      "sort Thoughts",
      "Sort Thoughts from thoughts page"
    );
    const reverseThoughts = [...thoughts].reverse();
    setThoughts(reverseThoughts);
    setSort(sort === " by latest" ? " by oldest" : " by latest");
  }

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  function logout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("username");
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
    const fetchThoughts = async () => {
      try {
        const response = await fetch(base_url + "thoughts/" + topicobj._id, {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("usertoken"),
          },
        });
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
        console.log(json);
        if (json.data.length === 0) {
          setEmptyThoughts(true);
        }
        setThoughts(json.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchThoughts();
  }, [topicobj]);

  if (emptythoughts === false && thoughts.length === 0) {
    return (
      <div>
        {/* <div className="text-3xl text-black flex justify-center p-16">
          Loading...
        </div> */}
        <Loader />
      </div>
    );
  }

  function ThoughtLimit() {
    if (subDetails.isSubscribed) {
      return true;
    } else {
      if (thoughts.length < 30) {
        return true;
      } else {
        showToast(
          "You've hit the limit for adding Reflections. Upgrade now for unlimited access and additional benefits!"
        );
        return false;
      }
    }
  }

  function TruncatedText({ text, maxLength }) {
    const displayText =
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return (
      <div title={text} className="truncate">
        {displayText}
      </div>
    );
  }

  function Analyse() {
    if (thoughts.length < 3) {
      showToast(
        "Please contribute three or more reflections to enable AI analysis for optimal insights."
      );
    } else {
      // navigate("/analyse", {
      //   state: { data: topicobj.title, thoughts: thoughts },
      // });
      navigate("/AIanalysis", {
        state: { data: topicobj.title, thoughts: thoughts },
      });
      localStorage.setItem("sessionLoaded", "");
    }
  }

  return (
    <div className="font-sans">
      {showaddthought && (
        <AddThought
          onClosedialog={() => {
            setshowaddthought(false);
          }}
          topic={topicobj}
          setThoughts={setThoughts}
          toast={showToast}
          logout={logout}
        />
      )}
      {showeditthought && (
        <EditData
          onClosedialog={() => {
            setshoweditthought(false);
          }}
          datamode={"thought"}
          datapassed={selectedthought}
          topicid={topicobj._id}
          emptydata={setEmptyThoughts}
          setThoughts={setThoughts}
          toast={showToast}
          logout={logout}
        />
      )}
      {showinfo && (
        <ReflectionInfo
          onClosedialog={() => {
            setshowinfo(false);
          }}
        />
      )}

      {emptythoughts ? (
        <ThoughtLanding
          topic={topicobj}
          emptydata={setEmptyThoughts}
          setThoughts={setThoughts}
          toast={showToast}
        />
      ) : (
        <div className="bg-bgc min-h-screen">
          <div className="sticky top-0 z-60 bg-bgc font-sans shadow-md pt-2">
            <div className="w-parent flex flex-row justify-between items-center px-4 ">
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  if (localStorage.getItem("userid")) {
                    navigate(`/`);
                  } else {
                    navigate(`/topics`);
                  }
                }}
              >
                <img
                  src="/mindcachelogo.png"
                  className="h-9 w-9 rounded-full mr-2"
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
              <div className="flex  text-black text-2xl md:text-3xl px-4">
                <TruncatedText text={topicobj.title} maxLength={30} />
              </div>

              <div className="w-full flex mt-2 pl-4 py-2 whitespace-nowrap overflow-x-auto hide-scrollbar ">
                <div
                  className="relative mr-2 px-4 py-1 bg-bgc text-black rounded-full shadow-md text-sm flex items-center cursor-pointer  border-animation"
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "Begin AI Analysis",
                      "Begin AI Analysis from thoughts page"
                    );
                    Analyse();
                  }}
                >
                  <img src="/bolt.png" className="h-4 w-auto mr-1" alt="" />
                  <div className="mr-2 md:mr-0">Begin AI Analysis</div>
                </div>

                <div
                  className="px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer"
                  onClick={reverseThoughts}
                >
                  <img src="/sort.png" className="h-4 w-auto mr-1" alt="" />
                  <div className="mr-2 md:mr-0">Sort {sort}</div>
                </div>

                {!subDetails.isSubscribed && (
                  <div
                    className="ml-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer"
                    onClick={() => {
                      trackEvent(
                        "click",
                        "Buttons",
                        "Subscribe",
                        "Subscribe from thoughts page"
                      );
                      navigate(`/pricing`);
                    }}
                  >
                    <div>Subscribe</div>
                  </div>
                )}

                <div
                  className="ml-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer"
                  onClick={() => {
                    trackEvent(
                      "click",
                      "Buttons",
                      "Info",
                      "Info from thoughts page"
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

          <div className="flex-col items-center text-center pb-16">
            {thoughts.map((thought, index) => (
              <div
                key={index}
                className="bg-[#C1D0EF] pb-4 px-2 m-2 md:m-4 md:pb-6 rounded-lg"
              >
                <div className="flex justify-end">
                  <div className="text-right text-sm font-mono  p-2">
                    {smoothifyDate(thought.time.toString())}
                  </div>
                  <div className="flex items-center">
                    <img
                      className="h-4 w-4 m-2 mt-2 cursor-pointer"
                      src="/threedots.svg"
                      alt=""
                      onClick={() => {
                        trackEvent(
                          "click",
                          "Buttons",
                          "Edit Reflection",
                          "Edit Reflection from thoughts page"
                        );
                        setSelectedthought(thought);
                        setshoweditthought(true);
                      }}
                    />
                  </div>
                </div>
                <div className="text-center text-black text-sm md:text-base">
                  {thought.collapse ? (
                    <div className="italic">** Reflection hidden **</div>
                  ) : (
                    <div>{thought.thought}</div>
                  )}
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
                "Add Reflection",
                "Add Reflection from thoughts page"
              );
              if (ThoughtLimit()) {
                setshowaddthought(true);
              }
            }}
          >
            + Add Reflection
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

export default Thoughts;

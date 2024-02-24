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
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

  useEffect(() => {
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
    const displayText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  
    return (
      <div title={text} className="truncate">
        {displayText}
      </div>
    );
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
          <div className="sticky top-0 z-60 bg-bgc font-sans shadow-md  px-4 py-2">
            <div className="w-parent flex flex-row justify-between  ">
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
                {/* {topicobj.title} */}
                <TruncatedText text={topicobj.title} maxLength={30} />
              </div>
              <div className="w-full flex mt-4 mb-2">
                <div
                  className="mr-2 px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer"
                  onClick={() => {
                    navigate("/analyse", {
                      state: { data: topicobj.title, thoughts: thoughts },
                    });
                    localStorage.setItem("sessionLoaded", "");
                  }}
                >
                  <img src="/bolt.png" className="h-4 w-auto mr-1" alt="" />
                  <div>Analyse</div>
                </div>
                <div
                  className="px-4 py-1 bg-bgc text-black rounded-full border-2 border-gray-600  shadow-md text-sm flex items-center cursor-pointer"
                  onClick={reverseThoughts}
                >
                  <img src="/sort.png" className="h-4 w-auto mr-1" alt="" />
                  <div>Sort {sort}</div>
                </div>

                <div
                  className="ml-2  flex items-center cursor-pointer"
                  onClick={() => {
                    setshowinfo(true);
                  }}
                >
                  <img src="/info.png" className="h-7 w-auto mr-1" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col items-center text-center">
            {thoughts.map((thought, index) => (
              <div
                key={index}
                className="bg-blue-200 pb-4 px-2 m-2 md:m-4 md:pb-6 rounded-lg"
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
                        setSelectedthought(thought);
                        setshoweditthought(true);
                      }}
                    />
                  </div>
                </div>
                <div className="text-center text-black text-base md:text-lg">
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

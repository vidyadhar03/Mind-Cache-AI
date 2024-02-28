import NavBar from "../Commons/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { trackEvent } from "../utils/PageTracking";
import Loader from "../Commons/Loader";
import { Toast } from "../Commons/Toast";
import { getSessions } from "./ChatAPI";

export function Entrance() {
  const navigate = useNavigate();
  const location = useLocation();
  const topics = location.state?.data;

  //loader
  const [isLoading, setIsLoading] = useState(false);
  const enableLoader = () => {
    setIsLoading(true);
  };
  const disableLoader = () => {
    setIsLoading(false);
  };

  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  useEffect(() => {
    async function FetchSessions() {
      enableLoader();
      const result = await getSessions(showToast);
      disableLoader();
      if (result.success) {
        if (result.data.length !== 0) {
          navigate("/AIanalysis", {
            state: { sessions: result.data },
          });
        }
      } else {
        if (result.logout) {
          localStorage.removeItem("userid");
          localStorage.removeItem("usertoken");
          localStorage.removeItem("sessionLoaded");
          localStorage.removeItem("email");
          localStorage.removeItem("subscriptionDetails");
          showToast("Authentication failed, Kindly Login again!");
          navigate(`/`);
        }
      }
    }

    FetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-bgc font-sans">
      {isLoading && <Loader />}
      <NavBar />
      <div className="px-2">
        <div className="flex justify-center mt-8">
          <img src="bulb.png" className="w-28 h-28 rounded-full" alt="bulb" />
        </div>
        <div className="mt-4 mb-8 text-center text-lg">
          No AI Insight Sessions Detected. Choose a Focus Area and initiate
          <span className="underline mx-2">Begin AI Analysis</span> for
          personalized insights.
        </div>
        <div className="flex flex-col items-center mt-2 pb-16">
          {topics.map((topic, index) => (
            <div
              key={index}
              className=" bg-[#C1D0EF] text-center px-8 border border-gray-600 w-full md:w-1/2 my-1 rounded-md py-2 shadow-md cursor-pointer"
              onClick={() => {
                trackEvent(
                  "click",
                  "Buttons",
                  "Focus Area Click",
                  "Focus Area Click from AI History page"
                );

                navigate(`/topics/${topic.title.replace(/ /g, "")}`, {
                  state: { data: topic },
                });
              }}
            >
              {topic.title}
            </div>
          ))}
        </div>
      </div>
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
import NavBar from "../Commons/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/PageTracking";

export function Entrance() {
  const navigate = useNavigate();
  const location = useLocation();
  const topics = location.state?.data;
  return (
    <div className="min-h-screen bg-bgc font-sans">
      <NavBar />
      <div className="px-2">
        <div className="my-8 text-center text-lg">
          No AI Insight Sessions Detected. Choose a Focus Area and
          initiate 'Begin AI Analysis' for personalized insights.
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
    </div>
  );
}

import { useState, useEffect } from "react";
import { trackEvent } from "../utils/PageTracking";

export function FocusAreaInfo({ onClosedialog }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed bottom-0 flex items-center justify-center font-sans">
      <div
        className={` text-center py-2 sm:py-4 px-4 sm:px-8 bg-bgc border shadow-inner rounded-3xl w-full transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end p-2 cursor-pointer">
          <img
            src="/cancel-solid.png"
            alt=""
            className="h-6 w-6 rounded-full mb-2"
            onClick={() => {
              trackEvent("click", "Buttons", "Cancel", "Cancel from topics info");
              setIsVisible(false);
              setTimeout(onClosedialog, 500);
            }}
          />
        </div>
        <div className="text-xs md:text-base">
          At Mind Cache AI, we believe in the power of self-reflection and
          introspection to foster personal growth and mental well-being. Focus
          Areas are the cornerstone of this journey.
        </div>
        <div className="font-semibold text-black my-4 text-md md:text-lg">
          What is a Focus Area?
        </div>
        <div className="text-xs md:text-base">
          A Focus Area is a theme or subject that you choose to explore in depth
          through your reflections. It's a space where you can concentrate your
          thoughts, feelings, and observations, allowing for a structured yet
          flexible approach to personal introspection.
        </div>
        <div className=" font-semibold text-black my-4 text-md md:text-lg">
          Why are Focus Areas Important?
        </div>
        <div className="text-xs md:text-base mb-16">
          By creating Focus Areas, you provide structure to your introspective
          journey. This can range from specific aspects of your life you wish to
          understand better, to broader themes of mental and emotional
          well-being. Focus Areas help organize your thoughts, making your
          reflections more meaningful and insightful.
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { trackEvent } from "../utils/PageTracking";

export function ReflectionInfo({ onClosedialog }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed bottom-0 flex items-center justify-center font-sans w-full">
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
              trackEvent("click", "Buttons", "Cancel", "Cancel from thoughts info");
              setIsVisible(false);
              setTimeout(onClosedialog, 500);
            }}
          />
        </div>
        <div className="text-xs md:text-base">
          At Mind Cache AI, we believe reflecting on thoughts and experiences is
          crucial for self-discovery and personal growth, fostering a deeper
          understanding of ourselves and our lives.
        </div>
        <div className="font-semibold text-black my-4 text-sm md:text-lg">
          What are Reflections?
        </div>
        <div className="text-xs md:text-base">
          Reflections are personal entries in each Focus Area for documenting
          thoughts, feelings, and insights, acting as a digital journal for
          exploring emotions securely.
        </div>
        <div className=" font-semibold text-black my-4 text-sm md:text-lg">
          Why are Reflections Important?
        </div>
        <div className="text-xs md:text-base mb-16">
          Reflections provide a space for self-expression and self-exploration.
          By documenting your thoughts and experiences, you gain clarity and
          perspective on your life journey. Over time, Reflections help you
          identify patterns, gain insights, and track your progress towards
          personal goals, fostering greater self-awareness and emotional
          well-being.
        </div>
        {/* <div className="text-xs md:text-base">
          Mind Cache AI champions introspection for self-growth, offering a
          platform for deep self-understanding.
        </div>
        <div className="font-semibold text-black my-4 text-md md:text-lg">
          What are Reflections?
        </div>
        <div className="text-xs md:text-base">
          Reflections are personal insights recorded in Focus Areas, acting as a
          digital journal for your emotional and cognitive journey.
        </div>
        <div className="font-semibold text-black my-4 text-md md:text-lg">
          Why are Reflections Important?
        </div>
        <div className="text-xs md:text-base mb-16">
          They enable self-exploration, offering clarity and tracking personal
          growth, thereby enhancing self-awareness and emotional health.
        </div> */}
      </div>
    </div>
  );
}

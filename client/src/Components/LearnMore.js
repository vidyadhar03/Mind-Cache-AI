import { useState, useEffect } from "react";

export function FocusAreaInfo({ onClosedialog }) {
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to listen for changes in visibility
  useEffect(() => {
    setIsVisible(true); // Trigger the slide-in effect when the component mounts
  }, []);

  return (
    <div className="fixed bottom-0 flex items-center justify-center font-sans">
      <div
      className={` text-center py-2 sm:py-4 px-4 sm:px-8 bg-gray-50 border shadow-xl rounded-3xl w-full transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="text-sm md:text-lg">
        At Mind Cache AI, we believe in the power of self-reflection and
        introspection to foster personal growth and mental well-being. Focus
        Areas are the cornerstone of this journey.
      </div>
      <div className="font-semibold text-black my-4">
        What is a Focus Area?
      </div>
      <div className="text-sm">
        A Focus Area is a theme or subject that you choose to explore in depth
        through your reflections. It's a space where you can concentrate your
        thoughts, feelings, and observations, allowing for a structured yet
        flexible approach to personal introspection.
      </div>
      <div className=" font-semibold text-black my-4">
        Why are Focus Areas Important?
      </div>
      <div className="text-sm">
        By creating Focus Areas, you provide structure to your introspective
        journey. This can range from specific aspects of your life you wish to
        understand better, to broader themes of mental and emotional well-being.
        Focus Areas help organize your thoughts, making your reflections more
        meaningful and insightful.
      </div>
      <button
        className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg mt-2"
        onClick={() => {
          setIsVisible(false); // Prepare for slide-out effect
          setTimeout(onClosedialog, 500); // Delay the close dialog to allow animation to complete
        }}
      >
        Dismiss
      </button>
    </div>
    </div>
    
  );
}

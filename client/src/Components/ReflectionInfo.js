import { useState, useEffect } from "react";

export function ReflectionInfo({ onClosedialog }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed bottom-0 flex items-center justify-center font-sans">
      <div
        className={` text-center py-2 sm:py-4 px-4 sm:px-8 bg-gray-50 border shadow-xl rounded-3xl w-full transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="flex justify-end p-2 cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClosedialog, 500);
          }}
        >
          <img
            src="/cancel-solid.png"
            alt=""
            className="h-6 w-6 rounded-full mb-2"
          />
        </div>
        <div className="text-sm md:text-lg">
          Reflecting on your thoughts and experiences can be a powerful tool for
          personal growth and self-discovery. At Mind Cache AI, we recognize the
          importance of introspection in cultivating a deeper understanding of
          ourselves and our lives.
        </div>
        <div className="font-semibold text-black my-4 text-md md:text-xl">
          What are Reflections?
        </div>
        <div className="text-sm md:text-lg">
          Reflections are your personal entries within each Focus Area where you
          can record your thoughts, feelings, and insights. They serve as a
          digital journal of your innermost thoughts and experiences, allowing
          you to explore and process your emotions in a safe and supportive
          environment.
        </div>
        <div className=" font-semibold text-black my-4 text-md md:text-xl">
          Why are Reflections Important?
        </div>
        <div className="text-sm md:text-lg mb-16">
          Reflections provide a space for self-expression and self-exploration.
          By documenting your thoughts and experiences, you gain clarity and
          perspective on your life journey. Over time, Reflections help you
          identify patterns, gain insights, and track your progress towards
          personal goals, fostering greater self-awareness and emotional
          well-being.
        </div>
      </div>
    </div>
  );
}

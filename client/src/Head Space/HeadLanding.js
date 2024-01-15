import "./HeadLanding.css";
import AddTopic from "./AddTopic";
import { useState } from "react";

function HeadLanding() {
  const [showtopic, setshowtopic] = useState(false);

  const handleCreate = () => {
    setshowtopic(true);
  };

  const handleClose = () => {
    setshowtopic(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {showtopic && <AddTopic onClosedialog={handleClose} />}
      <div class="title">Head Space</div>
      <div class="contentdiv">
        <img src="/meditationlogo.png" class="contentimg" />
        <div className=" p-4 my-auto text-center max-w-xl text-black font-medium">
          <p>
            It's fascinating to see how your thoughts have evolved over the past
            couple of weeks. Two weeks ago, you expressed a desire to build AI
            apps in the future to expand human consciousness. This indicates a
            strong interest in utilizing technology to enhance human experiences
            and possibly contribute to personal growth on a larger
            scale.\n\nMore recently, just two days ago, you mentioned wanting to
            explore robotics and build robots with AI attached to them. This
            shift in focus suggests a growing curiosity towards the physical
            manifestation of AI and its potential applications in the field of
            robotics.\n\nThese changes in your thought pattern may signify a
            deepening exploration of the intersection between AI, human
            consciousness, and physical embodiments. It appears that you are
            moving beyond purely conceptual ideas and starting to consider
            practical ways to integrate AI into tangible forms like
            robots.\n\nTo delve deeper into your evolving mindset and emotions
            associated with these thoughts, I invite you to reflect on the
            reasons behind this shift. What sparked your interest in exploring
            robotics? How do you envision the integration of AI and robotics
            expanding human consciousness? Are there specific goals or
            aspirations you hope to achieve through building AI apps or
            robots?\n\nAdditionally, consider examining the emotions that
            accompany these thoughts. Do you feel a sense of excitement or
            curiosity when imagining building AI apps or robots? How does this
            align with your overall personal growth objectives? Are there any
            concerns or fears that arise when contemplating these
            endeavors?\n\nBy exploring these questions, you can gain a deeper
            understanding of your motivations, values, and aspirations. This
            self-reflection will help guide you in making informed decisions
            about your future endeavors.\n\nNow, I would love to hear more about
            your journey and how these thoughts have impacted you. How have
            these ideas influenced your daily life or actions? Are there any
            specific steps you plan to take to further explore AI apps or
            robotics? Let's continue this dialogue and uncover more insights
            together.
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        Go ahead and create your first topic about which you wanna introspect
      </div>
      <button
        className="bg-blue-200 mt-6 rounded-sm py-2 px-6 hover:bg-blue-600"
        onClick={() => handleCreate()}
      >
        Create Topic
      </button>
    </div>
  );
}

export default HeadLanding;

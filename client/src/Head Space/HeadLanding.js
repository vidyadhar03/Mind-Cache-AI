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
      <div className="title">Head Space</div>
      <div className="contentdiv">
        <img src="/meditationlogo.png" className="contentimg" />
        <div className=" p-4 my-auto text-center max-w-xl text-black font-medium">
          <p>
            Mind Cache specifically designed to notice thought patterns and to provide insights onto yourself.
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

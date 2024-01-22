import { useState } from "react";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddTopicAPI } from "../utils/Api";

function TopicLanding({ emptydata }) {
  const [topic, setTopic] = useState("");
  const { setTopics } = useContext(DataContext);

  async function handleCreate() {
    if (topic !== "") {
      const result = await AddTopicAPI(topic);
      if (result.success) {
        setTopics(result.data);
        emptydata(false);
      }
    }
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex flex-col md:flex-row">
        <img
          src="/meditationlogo.png"
          className="h-auto mx-2 md:h-80 md:mx-12 rounded-full"
          alt="logo"
        />
        <div className=" p-4 my-auto text-center max-w-xl text-black font-medium">
          <p>
            Mind Cache specifically designed to notice thought patterns and to
            provide insights onto yourself.
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        Go ahead and create your first topic about which you wanna introspect
      </div>
      <input
        placeholder="Topic Name"
        className="p-2 border-2 rounded-lg mt-4"
        onChange={(e) => {
          setTopic(e.target.value);
        }}
      />
      <button
        className="bg-blue-200 mt-2 rounded-lg py-2 px-6 hover:bg-blue-600"
        onClick={() => {
          handleCreate();
        }}
      >
        Create Topic
      </button>
    </div>
  );
}

export default TopicLanding;

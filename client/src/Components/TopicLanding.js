import { useState } from "react";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddTopicAPI } from "../utils/Api";
import { TextField } from "@mui/material";

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
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="flex flex-col  md:flex-row ">
        <div className="flex md:flex-1 justify-center">
          <img
            src="/meditationlogo.png"
            className="h-72 w-72 md:h-96 md:w-96 rounded-full"
            alt="logo"
          />
        </div>

        <div className="md:flex-1 flex justify-center  ">
          <div className="flex flex-col  justify-center">
            <div className="my-8 text-center font-medium text-base">
              Create your first Focus Area now. It could be anything that
              resonates with you – from 'Mindfulness' and 'Career Goals' to
              'Relationship Insights','Exploring Happiness' or as specific as
              'My Journey with Yoga'. Unleash your potential, one reflection at
              a time!
            </div>
            <div className="flex justify-center px-2">
              <form
                className="flex flex-col w-full md:w-96"
                onSubmit={handleCreate}
              >
                <TextField
                  id="outlined-basic"
                  label="Focus Area"
                  variant="outlined"
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg font-medium my-4"
                >
                  Create My First Focus Area
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div>
          At Mind Cache AI, we believe in the power of self-reflection and
          introspection to foster personal growth and mental well-being. Focus
          Areas are the cornerstone of this journey.
        </div>
        <div className="text-lg font-semibold text-black my-4">
          What is a Focus Area?
        </div>
        <div>
          A Focus Area is a theme or subject that you choose to explore in depth
          through your reflections. It's a space where you can concentrate your
          thoughts, feelings, and observations, allowing for a structured yet
          flexible approach to personal introspection.
        </div>
        <div className="text-lg font-semibold text-black my-4">
          Why are Focus Areas Important?
        </div>
        <div>
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

export default TopicLanding;

import { useState } from "react";
import { AddTopicAPI } from "../utils/Api";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Commons/NavBar";

function TopicLanding({ emptydata, toast, pinTopics,setTopics }) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");

  async function handleCreate(event) {
    event.preventDefault();
    if (topic !== "") {
      console.log("called api");
      const result = await AddTopicAPI(topic);
      if (result.success) {
        console.log("result success");
        setTopics(pinTopics(result.data));
        emptydata(false);
        navigate(`/topics`);
      } else {
        toast("something went wrong, try again later!");
      }
    } else {
      toast("Focus Area is empty!");
    }
  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col  md:flex-row h-[calc(100vh-70px)] bg-gray-50 font-sans">
        <div className="flex md:flex-1 justify-center items-center">
          <img
            src="/meditationlogo.png"
            className="h-72 w-72 md:h-96 md:w-96 rounded-full"
            alt="logo"
          />
        </div>

        <div className="md:flex-1 flex justify-center  ">
          <div className="flex flex-col  justify-center">
            <div className="mt-8 text-center font-semibold text-lg">
              Create your first Focus Area now. It could be anything that
              resonates with you.
            </div>
            <ul className="mt-4 mb-8 ml-4 list-disc pl-5 text-base">
              <li>Relationship Insights</li>
              <li>Career Goals</li>
              <li>Coping with Stress & Anxiety</li>
              <li>Gratitude and Joy</li>
              <li>or as specific as ' My Journey with Yoga '</li>
            </ul>
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
    </div>
  );
}

export default TopicLanding;

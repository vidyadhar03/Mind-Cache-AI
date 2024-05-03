import { useState } from "react";
import { AddTopicAPI } from "../utils/Api";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Commons/NavBar";
import { encryptData } from "../utils/Encryption";
import "./buttonanim.css";

function TopicLanding({
  emptydata,
  toast,
  decryptTopics,
  pinTopics,
  setTopics,
}) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");

  const topics = [
    "Fitness",
    "Hobbies",
    "Art",
    "Mental Health",  
    "Finances", 
    "Work-Life Balance", 
    "Nutrition",
    "Relationships",
    "Gratitude",
    "Yoga", 
    "Professional Aspirations", 
    "Spirituality",
    "Education",
    "Mindfulness",
    "Travel",
    "Personal Development",  
    "Emotional Intelligence", 
    "Sleep",
    "Productivity", 
    "Learning New Skills", 
    "Parenting",
    "Volunteering",
    "Leadership",
    "Socializing", 
    "Innovation",
    "Culture",
    "Environment"
];

  

  async function handleCreate(event) {
    event.preventDefault();
    if (topic !== "") {
      const encryptedTopic = await encryptData(topic);
      // console.log("called api");
      const result = await AddTopicAPI(encryptedTopic, toast);
      if (result.success) {
        // console.log("result success");
        const decryptedTopics = await decryptTopics(result.data);
        setTopics(pinTopics(decryptedTopics));
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
        <div className="flex md:flex-1 justify-center items-center mt-8">
          <img
            src="/logointrospect.png"
            className="h-72 w-72 md:h-96 md:w-96 rounded-full"
            alt="logo"
          />
        </div>

        <div className="md:flex-1 flex justify-center  ">
          <div className="flex flex-col  justify-center">
            <div className="mt-8 text-center font-semibold md:text-lg">
              Create your first Focus Area. It could be anything that
              resonates with you.
            </div>

            <div className="flex justify-center px-2 mt-4">
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
                    shrink: true,  // Ensures the label always stays floated
                  }}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg font-medium mt-2 mb-4"
                >
                  Create My First Focus Area
                </button>
              </form>
            </div>

            <div className="my-1 text-center font-semibold text-md">
            You may opt for one of the following
            </div>

            <div className="flex flex-wrap justify-center mx-8 md:mx-12 lg:mx-16">
              {topics.map((topic, index) => (
                  <div key={index} className="text-sm md:text-md m-1 flex justify-center border px-4 py-2 rounded-lg bg-first-blue hover:bg-second-blue cursor-pointer topic-animate" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={()=>{
                    setTopic(topic)
                  }}>
                    {topic}
                  </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicLanding;

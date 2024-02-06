import { useState } from "react";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddThoughtAPI } from "../utils/Api";
import { TextField } from "@mui/material";

export function ThoughtLanding({ topic, emptydata, toast }) {
  const [thought, setThought] = useState("");
  const { setThoughts } = useContext(DataContext);

  async function handleCreate(event) {
    event.preventDefault();
    if (thought !== "") {
      const result = await AddThoughtAPI(topic._id, thought);
      if (result.success) {
        setThoughts(result.data);
        emptydata(false);
      } else {
        toast("something went wrong, try again later!");
      }
    } else {
      toast("Reflection is empty!");
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-70px)] bg-gray-50 font-sans">
      {/* <div className="flex justify-center font-bold text-xl md:text-2xl my-8">
        {topic.title}
      </div>

      <div className="flex flex-col md:flex-row md:mt-12"> */}

      <div className="flex md:flex-1 justify-center items-center mt-8 md:mt-0">
        <img
          src="/white_one_cool.jpg"
          className="h-72 w-72 md:h-96 md:w-96 rounded-full"
          alt="logo"
        />
      </div>

      <div className="md:flex-1 flex justify-center  px-4">
        <div className="flex flex-col  justify-center">
          <div className="my-8 text-center font-medium text-lg">
            Begin your journey of introspection with{" "}
            <span className="font-semibold">{topic.title}</span>. What's the
            first thought that comes to mind?
          </div>
          {/* <ul className="mt-4 mb-8 ml-4 list-disc pl-5 text-base">
              <li>Relationship Insights</li>
              <li>Career Goals</li>
              <li>Coping with Stress & Anxiety</li>
              <li>Gratitude and Joy</li>
              <li>or as specific as ' My Journey with Yoga '</li>
            </ul> */}
          <div className="flex justify-center px-2">
            <form
              className="flex flex-col w-full md:w-96"
              onSubmit={handleCreate}
            >
              <TextField
                id="outlined-basic"
                label="Reflection"
                variant="outlined"
                InputLabelProps={{
                  style: { fontFamily: "poppins" },
                }}
                onChange={(e) => setThought(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg font-medium my-4"
              >
                Add Reflection
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="text-xl font-medium mt-12 text-center">
          introspect yourself without prejuidices about the topic recently in
          your mind
        </div>

        <div className="flex justify-center font-bold text-2xl mt-12">
          {topic.title}
        </div>

        <textarea
          placeholder="Enter thought here.."
          className="border-2 rounded-lg p-2 mt-12"
          onChange={(e) => {
            setThought(e.target.value);
          }}
        />

        <button
          className="bg-blue-200 rounded-lg py-2 px-6 hover:bg-blue-600 mt-4"
          onClick={() => {
            handleCreate();
          }}
        >
          Add Thought
        </button>
      </div>
    </div>
  );
}

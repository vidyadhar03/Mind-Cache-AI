import { useState } from "react";
import { AddThoughtAPI } from "../utils/Api";
import { TextField } from "@mui/material";
import NavBar from "../Commons/NavBar";

export function ThoughtLanding({ topic, emptydata, setThoughts, toast }) {
  const [thought, setThought] = useState("");

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
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-70px)] bg-gray-50 font-sans">
        <div className="flex md:flex-1 justify-center items-center mt-8 md:mt-0">
          <img
            src="/white_one_cool.png"
            className="h-72 w-72 md:h-96 md:w-96 rounded-full object-cover"
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
      </div>
    </div>
  );
}

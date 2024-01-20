import { useState } from "react";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";
import { AddThoughtAPI } from "../utils/Api";

export function ThoughtLanding({ topic, emptydata }) {
  const [thought, setThought] = useState("");
  const { setThoughts } = useContext(DataContext);

  async function handleCreate() {
    if (!thought == "") {
      const result = await AddThoughtAPI(topic._id, thought);
      if (result.success) {
        setThoughts(result.data);
        emptydata(false);
      }
    }
  }

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
          className="bg-blue-200 mt-2 rounded-lg py-2 px-6 hover:bg-blue-600 mt-4"
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

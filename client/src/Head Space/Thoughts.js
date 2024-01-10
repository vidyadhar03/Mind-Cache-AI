import {useLocation, useParams } from "react-router-dom";
import { DataContext } from "../utils/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddThought from "./AddThought";

function Thoughts() {
  const location = useLocation();
  const topicobj = location.state?.data;
  const { thoughts,setThoughts } = useContext(DataContext);
  const [showaddthought, setshowaddthought] = useState(false);
  const navigate = useNavigate();

  console.log(localStorage.getItem("usertoken"))

  useEffect(()=>{
    const fetchThoughts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/thoughts/" + topicobj._id,
          {
            method: "GET",
            headers: {
              'authorization': localStorage.getItem("usertoken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json)
        setThoughts(json.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchThoughts();
  },[topicobj])

  const handleopen = () => {
    setshowaddthought(true);
  };

  const handleclose = () => {
    setshowaddthought(false);
  };

  return (
    <div>
      {showaddthought && (
        <AddThought onClosedialog={handleclose} topic={topicobj} />
      )}
      <div className="text-black text-2xl font-bold text-center my-8">
        {topicobj.title}
      </div>

      <div className="flex justify-end mr-4 font-medium">
        <button
          className="border-2 p-2 rounded-lg hover:bg-blue-100"
          onClick={() => {
            navigate('/analyse');
          }}
        >
          Analyse Thoughts
        </button>
      </div>

      <div className="flex-col items-center text-center">
        {thoughts.map((thought,index) => (
          <div key={index} className="bg-blue-200 pb-6 m-4 rounded-lg">
            <div className="text-right text-sm font-mono  p-2">
              {thought.time}
            </div>
            <div className="text-center text-black text-lg">
              {thought.thought}
            </div>
          </div>
        ))}
      </div>

      <div
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={handleopen}
      >
        + Add Thought
      </div>
    </div>
  );
}

export default Thoughts;

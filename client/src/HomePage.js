import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  //   let spaces = ["Head Space", "Body Space", "Work Space"];
  //   let spaceComponents = ["headspace","bodyspace","workspace"]
  return (
    <div className=" p-4 flex felx-grow  my-20 ">
      <div
        className="mx-auto my-14 text-4xl p-8 rounded-md shadow-md bg-red-100 hover:bg-red-200 cursor-pointer"
        onClick={() => {
          navigate("/headspace");
        }}
      >
        Head Space
      </div>
      <div
        className="mx-auto my-14 text-4xl p-8 rounded-md shadow-md bg-red-100 hover:bg-red-200 cursor-pointer"
        onClick={() => {
          navigate("/bodyspace");
        }}
      >
        Body Space
      </div>
      <div
        className="mx-auto my-14 text-4xl p-8 rounded-md shadow-md bg-red-100 hover:bg-red-200 cursor-pointer"
        onClick={() => {
          navigate("/workspace");
        }}
      >
        Work Space
      </div>
    </div>
  );
}

export default HomePage;

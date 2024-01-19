import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  // console.log(localStorage.getItem("userid"))
  return (
    <div className=" p-4 flex felx-grow  my-20 ">
      home page 
    </div>
  );
}

export default HomePage;

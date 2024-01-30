import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const height = navbar.getBoundingClientRect().height;
    console.log(height);
  }, []);

  const userid = localStorage.getItem("userid");

  return (
    <div
      id="navbar"
      className="w-parent flex flex-row justify-between shadow-md px-4 py-2 sticky top-0 z-10 bg-bgc "
    >
      <div
        className="flex cursor-pointer"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <img
          src="/mindcachelogo.png"
          className="h-8 w-8 rounded-full mr-2"
          alt="logo"
        />
        <div className="my-auto text-black text-xl font-sans text-justify">
          Mind Cache AI
        </div>
      </div>

      <button
        className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-sm"
        onClick={()=>{if(userid){
            navigate(`/analyse`)}else{navigate(`/signin`)}}}
      >
        {userid ? "Analyse" : "Sign In"}
      </button>

    </div>
  );
}

export default NavBar;

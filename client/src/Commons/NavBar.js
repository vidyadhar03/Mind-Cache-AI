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
      className="w-parent flex flex-row justify-between shadow-md px-4 py-2 sticky top-0 z-60 bg-bgc font-sans"
    >
      <div
        className="flex cursor-pointer"
        onClick={() => {
          if(userid){navigate(`/`);}else{
            navigate(`/topics`);
          }
        }}
      >
        <img
          src="/mindcachelogo.png"
          className="h-8 w-8 rounded-full mr-2"
          alt="logo"
        />
        <div className="my-auto text-black text-xl text-justify">
          Mind Cache AI
        </div>
      </div>

      {userid? <button className="flex items-center justify-center " onClick={()=>{
        navigate(`/account`);
      }}>
        <img src="/user-profile-new.png" className="h-8 w-8 "/>
        {/* <div className="flex-col items-end">Account</div> */}
      </button>:<div>
      <button
        className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-sm"
        onClick={()=>{navigate(`/signin`)}}
      >
        Sign In
      </button>
      </div>
      }

    </div>
  );
}

export default NavBar;

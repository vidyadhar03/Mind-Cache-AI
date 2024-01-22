import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';


function NavBar(){
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const height = navbar.getBoundingClientRect().height;
    console.log(height)
  }, []);

  const userid = localStorage.getItem("userid")

    return <div id="navbar" className="w-parent flex flex-row justify-between shadow-md px-4 py-2 sticky top-0 z-10 bg-gray-50 ">
        <div className="flex cursor-pointer" onClick={()=>{
            navigate(`/`)
        }}>
        <img src="/mindcachelogo.png" className="h-8 w-8 rounded-full mr-2" alt="logo"/>
        <div className="my-auto text-xl font-sans text-justify" >Mind Cache AI</div>
        </div>
        {userid?(
            <button className="px-8 py-2 font-sans bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium" onClick={()=>{
                navigate(`/signin`)
            }}>Analyse</button>
        ):(
            <button className="px-8 py-2 font-sans bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium " onClick={()=>{
                navigate(`/signin`)
            }}>Sign In</button>
        )}
        
    </div>
}

export default NavBar;
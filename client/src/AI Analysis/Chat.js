import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../utils/PageTracking";

export function Chat() {
  const location = useLocation();
  const topicTitle = location.state?.data;
  const thoughts = location.state?.thoughts;
  const sessions = location.state?.sessions;
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  console.log("topic title:",topicTitle);
  console.log("thoughts:",thoughts);
  console.log("sessions:",sessions);

  return (
    <div className="h-screen bg-bgc font-sans">
      <div
        id="navbar"
        className="w-parent flex flex-row justify-between items-center shadow-md px-4 py-2 sticky top-0 z-[100] bg-bgc font-sans"
      >
        <div
          className="flex cursor-pointer"
          onClick={() => {
            if (userid) {
              navigate(`/topics`);
            } else {
              navigate(`/`);
            }
          }}
        >
          <img
            src="/mindcachelogo.png"
            className="h-9 w-9 rounded-full mr-2"
            alt="logo"
          />
          <div className="my-auto text-black text-xl text-justify">
            Mind Cache AI
          </div>
        </div>

        <button
          className="flex items-center justify-center "
          onClick={() => {
            trackEvent(
              "click",
              "Buttons",
              "My Account",
              "My Account from Chat Component"
            );
            navigate(`/account`);
          }}
        >
          <img src="/user-profile-new.png" className="h-8 w-8 " alt="" />
        </button>
      </div>
    </div>
  );
}

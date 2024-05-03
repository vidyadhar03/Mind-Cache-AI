import { useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/PageTracking";
// import { useEffect } from "react";
import { getUserDetails } from "../utils/SubscriptionDetails";

function NavBar() {
  const navigate = useNavigate();
  const userDetails=getUserDetails();

  // useEffect(() => {
  //   const navbar = document.getElementById("navbar");
  //   const height = navbar.getBoundingClientRect().height;
  //   console.log(height);
  // }, []);

  return (
    <div
      id="navbar"
      className="w-parent flex flex-row justify-between items-center shadow-md px-4 py-2 sticky top-0 z-[100] bg-bgc font-sans"
    >
      <div
        className="flex cursor-pointer"
        onClick={() => {
          if (userDetails) {
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

      {userDetails ? (
        <button
          className="flex items-center justify-center "
          onClick={() => {
            trackEvent(
              "click",
              "Buttons",
              "My Account",
              "My Account from Nav Bar"
            );
            navigate(`/account`);
          }}
        >
          <img src="/user-profile-new.png" className="h-8 w-8 " alt="" />
        </button>
      ) : (
        <div>
          <button
            className="px-6 md:px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-sm"
            onClick={() => {
              trackEvent("click", "Buttons", "Sign In", "Sign In from Nav Bar");
              navigate(`/signin`);
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;

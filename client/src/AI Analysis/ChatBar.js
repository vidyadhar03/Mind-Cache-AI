import { trackEvent } from "../utils/PageTracking";
import { useNavigate } from "react-router-dom";

export const ChatBar = ({ onMenuClick,toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div
      id="navbar"
      className="w-parent flex flex-row justify-between items-center shadow-md px-4 py-2 sticky top-0 z-[100] bg-bgc font-sans"
    >
      <div className="flex items-center md:hidden">
        <img
          src="/navbaricon.png"
          className="h-8 w-auto mr-4"
          alt=""
        //   onClick={onMenuClick}
          onClick={(e) => {
            toggleSidebar();
            e.stopPropagation();
          }}
        />
      </div>

      <div
        className="flex cursor-pointer"
        onClick={() => {
          navigate(`/topics`);
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
            "My Account from Nav Bar"
          );
          navigate(`/account`);
        }}
      >
        <img src="/user-profile-new.png" className="h-8 w-8 " alt="" />
      </button>
    </div>
  );
};

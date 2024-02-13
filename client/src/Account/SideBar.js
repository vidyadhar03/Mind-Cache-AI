import { useNavigate } from "react-router-dom";

export const SideBar = ({ modifyActiveTab }) => {
  const navigate = useNavigate();


    const logout = () =>{
        localStorage.removeItem("userid")
        localStorage.removeItem("usertoken")
        localStorage.removeItem("sessionLoaded")
        navigate(`/`)
    }

  return (
    <div className="flex flex-col items-center p-4 md:p-0 ">
      <div
        className="px-4 md:px-2 py-2 border border-black rounded-lg text-center cursor-pointer w-full md:w-5/6"
        onClick={() => {
          modifyActiveTab("AccountDetails");
        }}
      >
        Account Details
      </div>
      <div
        className="px-4 md:px-2 py-2 my-4 border border-black rounded-lg text-center cursor-pointer w-full md:w-5/6"
        onClick={() => {
          modifyActiveTab("SubscriptionDetails");
        }}
      >
        Subscription Details
      </div>
      <div
        className="px-4 md:px-2 py-2 border border-black rounded-lg flex justify-center items-center cursor-pointer w-full md:w-5/6 "
        onClick={() => {logout()}}
      >
        <img src="/logout.svg" className="h-4 w-4 mr-2" alt=""/>
        Log Out
      </div>
    </div>
  );
};

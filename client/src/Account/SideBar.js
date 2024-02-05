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
    <div className="flex-col p-4 md:p-8">
      <div
        className="px-4 md:px-8 py-2 border border-black rounded-lg text-center cursor-pointer"
        onClick={() => {
          modifyActiveTab("AccountDetails");
        }}
      >
        Account Details
      </div>
      <div
        className="px-4 md:px-8 py-2 my-4 border border-black rounded-lg text-center cursor-pointer"
        onClick={() => {
          modifyActiveTab("SubscriptionDetails");
        }}
      >
        Subscription Details
      </div>
      <div
        className="px-4 md:px-8 py-2 border border-black rounded-lg flex justify-center items-center cursor-pointer "
        onClick={() => {logout()}}
      >
        <img src="/logout.svg" className="h-4 w-4 mr-2"/>
        Log Out
      </div>
    </div>
  );
};

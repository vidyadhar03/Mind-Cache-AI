
export const SideBar = ({ modifyActiveTab,showConfirm,setText }) => {
  
  const Logout = () => {
    setText("Confirm Log Out?")
    showConfirm();
  };

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
        onClick={() => {
          Logout();
        }}
      >
        <img src="/logout.svg" className="h-4 w-4 mr-2" alt="" />
        Log Out
      </div>
    </div>
  );
};

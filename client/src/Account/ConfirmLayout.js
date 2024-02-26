import { useNavigate } from "react-router-dom";

export function ConfirmLayout({ onClosedialog, text,setTriggercancel}) {
  const navigate = useNavigate();

  const Confirm = () => {
    if(text==="Confirm Log Out?"){
    localStorage.removeItem("userid");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("subscriptionDetails");
    onClosedialog();
    navigate(`/`);
    }else{
      setTriggercancel(true);
      onClosedialog();
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm font-sans z-[100]">
      <div className="py-2 mx-4 sm:py-4 px-4 sm:px-8 bg-gray-50 border shadow-xl rounded-lg w-11/12 sm:w-96">
        <div className=" text-center">{text}</div>
        <div className="flex justify-center mt-4 ">
          <button
            className="py-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg  "
            onClick={Confirm}
          >
            Confirm
          </button>

          <button
            className="py-2 flex-1 bg-white hover:bg-bgc text-black border-2 text-base rounded-lg ml-2"
            onClick={onClosedialog}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

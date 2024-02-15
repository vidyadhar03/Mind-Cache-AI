import { useEffect, useState } from "react";
import NavBar from "../Commons/NavBar";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
const base_url = process.env.REACT_APP_API_URL;

export function CreateSubscription({ plan }) {
  const navigate = useNavigate();
  const [url,setUrl] = useState();
  //loader
  const [isLoading, setIsLoading] = useState(false);
  const enableLoader = () => {
    setIsLoading(true);
  };
  const disableLoader = () => {
    setIsLoading(false);
  };
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  async function getSubscriptionlink() {
    enableLoader();
    try {
      const response = await fetch(base_url + "subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({
          plan: "monthly",
        }),
      });
      if (response.status === 403) {
        localStorage.removeItem("userid");
        localStorage.removeItem("usertoken");
        navigate("/");
      }
      if (!response.ok) {
        const data = await response.json();

        console.log(data);

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      disableLoader();
      console.log(data.short_url);

      // redirect(data.short_url);
      setUrl(data.short_url);
    } catch (e) {
      console.log(e);
      disableLoader();
      setDialogMessage("Payment request failed, please try again!");
      setShowDialog(true);
    }
  }

  // function redirect(url) {
  //   window.location.href = url;
  // }

  useEffect(() => {}, []);

  return (
    <div>
      {isLoading && <Loader />}
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center">
        <button
          className="border px-4 py-2 rounded-md shadow-md"
          onClick={getSubscriptionlink}
        >
          get link
        </button>
        <iframe
          src={url} // Make sure to replace `url` with your actual URL
          className="w-full h-screen border-none"
          // style={{ height: "calc(100vh - 4rem)" }} 
          title="Subscription Payment"
        ></iframe>
      </div>
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

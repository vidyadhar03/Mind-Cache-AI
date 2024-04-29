import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Loader from "../Commons/Loader";
import { Toast } from "../Commons/Toast";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/PageTracking";
const base_url = process.env.REACT_APP_API_URL;

export const AccountDetails = () => {
  const namestored = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "";
  // console.log(namestored);
  const [name, setName] = useState(namestored);
  const globalEmail = localStorage.getItem("email");
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
  const navigate = useNavigate();

  const showToast = (message) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  function logout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("username");
    localStorage.removeItem("sessionLoaded");
    localStorage.removeItem("email");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("subscriptionDetails");
    showToast("Authentication failed, Kindly Login again!");
    navigate(`/`);
  }

  async function AddUserName() {
    enableLoader();
    try {
      const response = await fetch(base_url + "updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({
          usermail: globalEmail,
          name: name,
        }),
      });
      if (response.status === 403) {
        logout();
      }
      if (!response.ok) {
        const json = await response.json();
        showToast(json.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      localStorage.setItem("username", name);
      showToast("Name updated");
      disableLoader();
    } catch (e) {
      disableLoader();
      console.error(e);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-4 md:p-8">
      {isLoading && <Loader />}
      <div className="text-xl">Your Account Details</div>
      <div className="w-full md:w-3/4 mt-4">
        <TextField
          id="outlined-basic"
          label="Add your Name"
          variant="outlined"
          InputLabelProps={{
            style: { fontFamily: "poppins" },
          }}
          sx={{ width: "100%", borderColor: "black" }}
          value={name}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full md:w-3/4 mt-4">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          disabled={true}
          InputLabelProps={{
            style: { fontFamily: "poppins" },
          }}
          sx={{ width: "100%", borderColor: "black" }}
          defaultValue={globalEmail}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div className="mt-4 text-base font-medium underline">Reset Password</div> */}
      <div
        className="text-center w-full md:w-3/4 px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-sm md:text-base mt-8 cursor-pointer"
        onClick={() => {
          trackEvent(
            "click",
            "Buttons",
            "Update User Details",
            "Update from Account details page"
          );
          AddUserName();
        }}
      >
        Update Details
      </div>
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import {
  setSubDetails,
  setUserDetails,
  getUserDetails,
} from "../utils/SubscriptionDetails";
import { trackEvent } from "../utils/PageTracking";
import { deriveAndStoreKeyInMemory } from "../utils/Encryption";

//input related material imports
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons

const base_url = process.env.REACT_APP_API_URL;

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;
  const name = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showsignup, setShowsignup] = useState(plan ? true : false);
  const [showPassword, setShowPassword] = useState(false);

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

  function updateUserDetails(json){
    let userDetails = {
      usertoken: json.token,
      userid: json.userid,
      username: json.name,
      email: email,
    };
    setUserDetails(userDetails);
    setSubDetails(json.subscriptionDetails);
    // let derivedkey = "";
    // deriveKeyFromPassword(password)
    //   .then((derivedKeyBase64) => {
    //     let ud = getUserDetails();
    //     ud.derivedkey = derivedKeyBase64;
    //     setUserDetails(ud);
    //   })
    //   .catch((error) => {
    //     deriveKeyFromPassword(password).then((derivedKeyBase64) => {
    //       let ud = getUserDetails();
    //       ud.derivedkey = derivedKeyBase64;
    //       setUserDetails(ud);
    //     });
    //   });
    deriveAndStoreKeyInMemory(email,password);
  }

  function checkForm() {
    // console.log(email, password);
    if (email === "" || password === "") {
      setDialogMessage("Email and password can not be empty!");
      setShowDialog(true);
      return false;
    }
    return true;
  }

  const SignUp = async (e) => {
    e.preventDefault();
    trackEvent("click", "Buttons", "SignUp", "SignUP from SignIn page");
    if (checkForm()) {
      enableLoader();
      try {
        const response = await fetch(base_url + "signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const json = await response.json();
          // console.log(json);
          setDialogMessage(json.message);
          setShowDialog(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        disableLoader();
        const json = await response.json();
        updateUserDetails(json);
        if (plan) {
          navigate(`/subscription`, { state: { plan }, replace: true });
        } else {
          navigate(`/topics`, { replace: true });
        }
      } catch (e) {
        //todo - update UI to user
        // setDialogMessage("Sign Up Failed!");
        // setShowDialog(true);
        disableLoader();
        console.error(e);
      }
    }
  };

  const LogIn = async (e) => {
    e.preventDefault();
    trackEvent("click", "Buttons", "LogIn", "LogIn from SignIn page");
    if (checkForm()) {
      enableLoader();
      try {
        const response = await fetch(base_url + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const json = await response.json();
          // console.log(json);
          setDialogMessage(json.message);
          setShowDialog(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        disableLoader();
        const json = await response.json();
        updateUserDetails(json);

        if (plan) {
          navigate(`/subscription`, { state: { plan }, replace: true });
        } else {
          navigate(`/topics`, { replace: true });
        }
      } catch (e) {
        // setDialogMessage("Login In failed!");
        // setShowDialog(true);
        disableLoader();
        console.error(e);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col font-sans items-center bg-bgc">
      {isLoading && <Loader />}
      <div
        className="flex justify-center items-center mt-20 cursor-pointer"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <img
          src="/mindcachelogo.png"
          className="w-16 h-16 rounded-full mr-4"
          alt=""
        />
        <div className="text-fifth-blue text-2xl sm:text-4xl font-semibold">
          Mind Cache AI
        </div>
      </div>

      {plan ? (
        <div className="text-center font-semibold my-10 mx-2">
          Please set up your account to continue with the subscription process.
        </div>
      ) : (
        <div className="text-center my-10 font-semibold mx-2">
          Your Pathway to Mindful Clarity: The AI-Powered Reflection Companion.
        </div>
      )}

      <div className="w-11/12 sm:w-96 px-4 py-6 border-2 rounded-lg shadow-lg">
        <form className="flex flex-col " onSubmit={showsignup ? SignUp : LogIn}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            InputLabelProps={{
              style: { fontFamily: "poppins" },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            sx={{ my: 2, width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { fontFamily: "poppins" },
            }}
            InputProps={{
              // Add an eye icon button to toggle password visibility
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-lg font-medium"
          >
            {showsignup ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>

      <div
        className="mt-4 cursor-pointer underline text-center text-base hover:text-blue-800 "
        onClick={() => {
          showsignup ? setShowsignup(false) : setShowsignup(true);
          trackEvent(
            "click",
            "Buttons",
            "Create a new account",
            "Create a new account from sign page"
          );
        }}
      >
        {showsignup ? "Already an user? LogIn" : "Create a new Account"}
      </div>

      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

export default SignIn;

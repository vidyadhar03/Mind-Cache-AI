import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const navigate = useNavigate();
  const name = "tracker user";
  const [email, setEmail] = useState("newgmail@gmail.com");
  const [password, setPassword] = useState("passwordhehe");
  const [showsignup, setShowsignup] = useState(true);

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/signup", {
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
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (e) {
      //todo - update UI to user
      console.error(e);
    }
  };

  const LogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
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
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      localStorage.setItem('usertoken',json.token)
      localStorage.setItem('userid',json.userid)
      navigate(`/topics`)
    } catch (e) {
      //todo - update UI to user
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 p-6 mt-20 border-2 rounded-lg shadow-lg">
        <form className="flex flex-col" onSubmit={showsignup?SignUp:LogIn}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-lg px-4 py-2 "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="my-4 border-2 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="flex justify-center px-6 py-2 bg-blue-200 border-2 rounded-lg hover:bg-blue-400"
          >
            {showsignup?"Sign Up":"Log In"}
          </button>
        </form>

        <div
          className="mt-2 cursor-pointer underline text-center text-md hover:text-blue-800 "
          onClick={() => {
            showsignup ? setShowsignup(false) : setShowsignup(true);
          }}
        >
          {showsignup ? "Already an user? LogIn" : "Create a new Account"}
        </div>
      </div>
    </div>
  );
}

export default SignIn;

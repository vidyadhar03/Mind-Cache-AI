import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export function SubscriptionStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.status;

  return (
    <div className="bg-bgc font-sans">
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center">
        {status === "active" ? (
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src="/waiting.png"
                className="h-40 w-40 rounded-full"
                alt=""
              />
            </div>
            <div className="text-center text-2xl font-semibold mt-8 text-green-500">
              Your Subscription is Active!
            </div>
          </div>
        ) : (
            <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src="/waiting.png"
                className="h-40 w-40 rounded-full"
                alt=""
              />
            </div>
            <div className="text-center text-2xl font-semibold mt-8 text-red-500">
              Your Subscription attempt has failed!
            </div>
          </div>
        )}
        <button
          className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium mt-8 mb-60"
          onClick={()=>{navigate(`/`)}}
        >
          Go to Dashboard.
        </button>
      </div>
      <Footer />
    </div>
  );
}
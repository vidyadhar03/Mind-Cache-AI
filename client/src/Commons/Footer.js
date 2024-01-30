import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row p-8 bg-bgc border-t border-gray-300 ">

      <div className="flex  flex-col md:flex-row justify-center md:w-3/4">

        <div className="flex flex-col text-center md:flex-1">
          <div className="text-xl font-semibold ">Our Social Links</div>
          <div className="flex justify-center mt-2">
            <a href="https://www.instagram.com/mindcacheai/">
              <img
                src="/instalogo.png"
                alt="Instagram"
                className="brand-logo"
                style={{ width: "48px", height: "48px" }}
              />
            </a>
            <a
              href="https://www.facebook.com"
              style={{ width: "48px", height: "48px" }}
            >
              <img
                src="/fblogo.png"
                alt="Facebook"
                className="brand-logo"
                style={{ width: "48px", height: "48px" }}
              />
            </a>
            {/* <a href="https://www.gmail.com">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/gmaillogo.png"
                  alt="Gmail"
                  style={{ width: "38px", height: "38px" }}
                />
              </div>
            </a> */}
          </div>
        </div>

        <div className="flex flex-col md:mx-4 my-8 md:my-0 text-center md:flex-1">
          <div className="text-xl font-semibold">FAQ & POLICY</div>
          <div className="flex flex-col justify-center mt-2">
            <Link to="/privacy-policy">Terms and Conditions</Link>
            <Link to="/exchange-return" className="my-1">Privacy Policy</Link>
            <Link to="/terms-conditions">Refunds/Cancellations</Link>
          </div>
        </div>

        <div className="flex flex-col text-center md:flex-1">
          <div className="text-xl font-semibold">Contact Us</div>
          <div className="flex flex-col justify-center mt-2">
            <Link to="/privacy-policy" >+917478022333</Link>
            <Link to="/exchange-return" className="my-1">mindcacheai03@gmail.com</Link>
            <Link to="/terms-conditions">Refunds/Cancellations</Link>
          </div>
        </div>

      </div>

      <div className="flex flex-col  items-center text-center mt-8 md:mt-0 md:w-1/4">
        <img
          src="/mindcachelogo.png"
          alt="Mind Cache AI Logo"
          className="h-20 w-20 rounded-full my-0"
        />
        <div className="text-xl font-semibold my-4">Mind Cache AI</div>
        <p>
          Your Pathway to Mindful Clarity: The AI-Powered Reflection Companion.
        </p>
      </div>

    </footer>
  );
};

export default Footer;

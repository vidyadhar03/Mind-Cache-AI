import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row p-8 bg-gray-50 border-t border-gray-300">
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col">
          <div className="text-xl font-semibold my-4">Our Social Links</div>
          <div className="flex justify-center">
            <a href="https://www.instagram.com">
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
            <a href="https://www.gmail.com">
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
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center text-center">
        <img
          src="/mindcachelogo.png"
          alt="Mind Cache AI Logo"
          className="h-20 w-20 rounded-full my-4"
        />
        <div className="text-xl font-semibold mb-4">Mind Cache AI</div>
        <p>
          Your Pathway to Mindful Clarity: The AI-Powered Reflection Companion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

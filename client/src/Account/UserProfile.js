import { useState } from "react";
import { SideBar } from "./SideBar";
import { ContentDisplay } from "./ContentDisplay";
import Footer from "../Commons/Footer";
import NavBar from "../Commons/NavBar";

export function UserProfile() {
  const [activeTab, modifyActiveTab] = useState("AccountDetails");
  return (
    <div className="font-sans bg-bgc">
      <NavBar/>
      
      <div className="pt-4  md:pt-10 mb-40">
        <div className="flex justify-center text-lg md:text-xl font-semibold">
          My Account
        </div>
        <div className="flex flex-col md:flex-row  mt-4 md:mt-10">
          <div className="md:w-2/5 border-gray-300 border-b md:border-b-0 md:border-r ">
            <SideBar modifyActiveTab={modifyActiveTab} />
          </div>
          <div className="md:w-3/5">
            <ContentDisplay activeTab={activeTab} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

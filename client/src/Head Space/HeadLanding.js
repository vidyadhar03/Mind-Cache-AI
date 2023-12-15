import "./HeadLanding.css";
import AddTopic from "./AddTopic";
import { useState } from "react";

function HeadLanding() {

 const [showtopic,setshowtopic] =useState(false)

 const handleCreate =()=>{
    setshowtopic(true)
 }

 const handleClose = () => {
    setshowtopic(false)
 }

  return (
    <div className="p-6 flex flex-col items-center">
        {showtopic&&<AddTopic onClosedialog={handleClose}/>}
      <div class="title">Head Space</div>
      <div class="contentdiv">
        <img src="/meditationlogo.png" class="contentimg" />
        <div className=" p-4 my-auto text-center max-w-xl text-black font-medium">
          <p>
            Start your journey of self exploration with the simplest and most
            effective journaling method. Start your journey of self exploration
            with the simplest and most effective journaling method.
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        Go ahead and create your first topic about which you wanna introspect
      </div>
      <button className="bg-blue-200 mt-6 rounded-sm py-2 px-6 hover:bg-blue-600"
      onClick={()=>handleCreate()} >
        Create Topic
      </button>
    </div>
  );
}

export default HeadLanding;

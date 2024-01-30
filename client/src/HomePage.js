import { useNavigate } from "react-router-dom";
import TypingAnimation from "./utils/TypeAnimation";
import Footer from "./Commons/Footer";

function HomePage() {
  const navigate = useNavigate();

  function Intro() {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-52px)] border-b border-gray-300 ">
        <div className="px-4 text-white text-4xl lg:text-6xl font-bold flex justify-center items-center h-1/2 lg:h-full lg:w-3/5 bg-third-blue">
          <TypingAnimation />
        </div>
        <div className="  flex flex-col items-center justify-center h-1/2 lg:h-full lg:w-2/5 bg-bgc p-2 ">
          <img src="/introspectlogo.jpg" className="h-1/2 lg-2/5 w-auto rounded-full mx-2"/>
          <div className="text-black text-2xl lg:text-4xl text-center mx-2 mt-4 font-medium">
            Gain insights into your mind.
          </div>
          <button
            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-base mt-6"
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  function BenefitsofJournaling() {
    return (
      <div className="h-96 bg-blue-200 flex justify-center items-center border-2 border-black">
        Benefits of Journaling section
      </div>
    );
  }

  function UsersReview() {
    return (
      <div className="h-96 bg-blue-200 flex justify-center items-center border-2 border-black">
        Users Review
      </div>
    );
  }

  function HowItWorks() {
    return (
      <div className="h-96 bg-blue-200 flex justify-center items-center border-2 border-black">
        How It works
      </div>
    );
  }

  function PricingPlans() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans">
        <div className="text-black text-center font-bold text-4xl">Pricing</div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 px-6">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg md:mx-4 sm:w-80 ">
            <div className="text-center text-4xl font-medium ">Free</div>
            <div className="mt-4 text-center text-lg ">
              10 AI Interactions per week
            </div>
            <div className=" text-center text-lg ">20 Topic creation Limit</div>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium ">Rs.0</div>
              <div className="flex flex-col justify-end text-md ml-1 ">
                per month
              </div>
            </div>
            <button className="w-full py-2 bg-green-600 hover:bg-green-800 text-white text-lg rounded-lg font-medium">
              Current Subscription
            </button>
          </div>

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-80 ">
            <div className="text-center text-4xl font-medium">Pro</div>
            <div className="mt-4 text-center text-lg">
              100 AI Interactions per week
            </div>
            <div className=" text-center text-lg">Unlimited Topic creation</div>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">Rs.129</div>
              <div className="flex flex-col justify-end text-md ml-1">
                per month
              </div>
            </div>
            <button 
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans ">
      <Intro />
      {/* <BenefitsofJournaling />
      <UsersReview />
      <HowItWorks /> */}
      <PricingPlans />
      <Footer />
    </div>
  );
}

export default HomePage;

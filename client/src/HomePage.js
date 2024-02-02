import { useNavigate } from "react-router-dom";
import TypingAnimation from "./utils/TypeAnimation";
import Footer from "./Commons/Footer";
import BenefitsDropdown from "./Components/Benifits";

function HomePage() {
  const navigate = useNavigate();

  function Intro() {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-52px)]  ">
        <div className="px-8 text-white text-4xl lg:text-6xl font-bold flex justify-center items-center h-1/3 lg:h-full lg:w-3/5 bg-third-blue">
          <TypingAnimation />
        </div>
        <div className="  flex flex-col items-center justify-center h-2/3 lg:h-full lg:w-2/5 bg-bgc p-2 ">
          <img
            src="/introspectlogo.jpg"
            className="h-1/2 lg-2/5 w-auto rounded-full mx-2"
          />
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
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          Why Mind Cache AI ?
        </div>
        <div className="text-center mt-8 flex flex-col items-center md:text-xl md:w-2/3 px-2 py-4 md:px-6 md:py-4 border shadow-lg rounded-lg">
          <div className="font-semibold underline text-lg md:text-2xl">
            Mind Caching
          </div>
          <div className="mt-2 md:mt-4 text-base md:text-lg  md:w-2/3">
            A dynamic way to capture and explore the evolving landscape of your
            thoughts, uncovering the subtle patterns that shape your mental
            well-being.
          </div>
          <div className="font-semibold underline mt-4 text-lg md:text-2xl">
            Artificial Intelligence
          </div>
          <div className="mt-2 md:mt-4 text-base md:text-lg  md:w-2/3">
            Empowered by AI, Mind Cache AI acts as your insightful reflection
            companion, spotlighting transformative patterns and insights within
            your reflections to amplify the benefits of mind caching beyond
            traditional journaling.
          </div>
          <div className=" mt-4 font-semibold underline text-lg md:text-2xl">
            Transformative Benefits
          </div>
          <div className="mt-2 md:mt-4 text-base md:text-lg text-center md:w-2/3">
            <BenefitsDropdown />
          </div>
        </div>
      </div>
    );
  }

  function UsersReview() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          Our Most Impactful User Story
        </div>

        <div className="border-2 px-8 py-4 rounded-lg shadow-lg mt-8 md:w-1/3">
          <div className=" text-center text-lg  text-black font-medium ">
            " I have been using your app and I like your idea. This helped me
            show my psychiatrist that I am not okay, and with this, my Bpd
            diagnosis came. "
          </div>
          <div className="flex mt-4 justify-center items-center">
            <img
              src="/userprofile.png"
              className="rounded-full h-10 w-10 "
              alt="profile"
            />
            <div className="ml-2 text-lg">Susana Teixeria</div>
          </div>
        </div>
      </div>
    );
  }

  function HowItWorks() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          How it works
        </div>
        {/* <div className="text-left mt-4">
          <span className="font-semibold">Mind Caching:</span> A dynamic way to capture and explore the evolving
          landscape of your thoughts, uncovering the subtle patterns that shape
          your mental well-being.
        </div> */}
      </div>
    );
  }

  function PricingPlans() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          Pricing
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 px-6">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg md:mx-4 sm:w-80 ">
            <div className="text-center text-2xl md:text-4xl font-medium ">
              Free
            </div>
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
            <div className="text-center text-2xl md:text-4xl font-medium">
              Pro
            </div>
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
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium">
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
      <HowItWorks />
      <UsersReview />
      <BenefitsofJournaling />
      <PricingPlans />
      <Footer />
    </div>
  );
}

export default HomePage;

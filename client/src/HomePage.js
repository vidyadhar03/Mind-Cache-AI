import { useNavigate } from "react-router-dom";
import TypingAnimation from "./utils/TypeAnimation";
import Footer from "./Commons/Footer";
import BenefitsDropdown from "./Components/Benifits";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NavBar from "./Commons/NavBar";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      navigate(`/topics`);
    }
  }, []);

  function Intro() {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-52px)]  bg-bgc">
        <div className="px-8 text-white text-4xl lg:text-6xl font-bold flex justify-center items-center h-1/3 lg:h-full lg:w-3/5 bg-third-blue">
          <TypingAnimation />
        </div>
        <div className="  flex flex-col items-center justify-center h-2/3 lg:h-full lg:w-2/5  p-2 slide-in-right ">
          <img
            src="/introspectlogo.jpg"
            className="h-1/2 lg-2/5 w-auto rounded-full mx-2"
            alt="introspect"
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
          <div className="font-semibold text-lg md:text-2xl">Mind Caching</div>
          <div className="mt-2 md:mt-4 text-base md:text-lg  md:w-2/3">
            A dynamic way to capture and explore the evolving landscape of your
            thoughts, uncovering the subtle patterns that shape your mental
            well-being.
          </div>
          <div className="font-semibold mt-4 text-lg md:text-2xl">
            Artificial Intelligence
          </div>
          <div className="mt-2 md:mt-4 text-base md:text-lg  md:w-2/3">
            The integration of AI technology sets Mind Cache AI apart from
            traditional journaling platforms. It actively engages with users'
            content to provide valuable insights and suggestions, making
            introspection a dynamic and rewarding experience.
          </div>
          <div className=" mt-4 font-semibold text-lg md:text-2xl">
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

        <div className="border-2 px-8 py-4 rounded-lg shadow-lg mt-8 md:w-1/2 lg:w-1/3">
          <div className=" text-center text-lg  text-black font-medium ">
            " I have been using your product and I like your idea. This helped
            me show my psychiatrist that I am not okay, and with this, my Bpd
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
    const FadeInDiv = ({ children }) => {
      const { ref, inView } = useInView({
        triggerOnce: false, // Only trigger the animation once
        threshold: 0.2, // Trigger when the div starts entering the viewport
      });

      return (
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          } `}
        >
          {children}
        </div>
      );
    };

    return (
      <div className=" flex flex-col pt-8 md:pt-16 bg-bgc font-sans items-center ">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          How Mind Cache AI works
        </div>
        <div className="flex-col  p-6 md:p-8 w-full ">
          <div className="flex flex-col md:flex-row">
            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 text-center border  rounded-lg shadow-lg  md:mr-2">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 1
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Set Your Intentions
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="compass.png"
                      className="w-28 h-28 rounded-full"
                      alt="compass"
                    />
                  </div>
                  <div className="mt-0">
                    Define personal goals in chosen areas of life to focus your
                    journey.
                  </div>
                </div>
              </FadeInDiv>
            </div>

            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 my-4 md:my-0 text-center border  rounded-lg shadow-lg md:ml-2 ">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 2
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Capture Your Journey
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="pen.png"
                      className="w-28 h-28 rounded-full"
                      alt="pen"
                    />
                  </div>
                  <div className="mt-0">
                    Log thoughts and experiences related to your goals,
                    effortlessly.
                  </div>
                </div>
              </FadeInDiv>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:mt-4">
            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 text-center border  rounded-lg shadow-lg md:mr-2 ">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 3
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Discover Insights with AI
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="bulb.png"
                      className="w-28 h-28 rounded-full"
                      alt="bulb"
                    />
                  </div>
                  <div className="mt-0">
                    Gain personalized insights through AI analysis of your
                    reflections.
                  </div>
                </div>
              </FadeInDiv>
            </div>

            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 my-4 md:my-0 text-center border  rounded-lg shadow-lg  md:ml-2">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 4
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Measure Growth and Evolve
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="chart.png"
                      className="w-28 h-28 rounded-full"
                      alt="chart"
                    />
                  </div>
                  <div className="mt-2">
                    Track progress over time and adapt goals as you grow.
                  </div>
                </div>
              </FadeInDiv>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PricingPlans() {
    function Subscribe(plan) {
      if (localStorage.getItem("usertoken")) {
        navigate(`/subscription`, { state: { plan } });
      } else {
        navigate(`/signin`, { state: { plan } });
      }
    }

    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          Pricing
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 ">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg md:mx-4 w-full sm:w-96 text-center">
            <div className=" text-2xl md:text-4xl font-medium ">Free Plan</div>
            <div className="text-base mt-2">Explorer</div>
            <ul className="list-disc pl-6 mt-4 text-lg text-left">
              <li className="mt-2">10 AI Interactions per month.</li>
              <li className="mt-2">10 Focus area creation limit.</li>
              <li className="mt-2">30 Reflections per Focus area.</li>
            </ul>
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

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center">
            <div className="text-2xl md:text-4xl font-medium">Monthly Plan</div>
            <div className="text-base mt-2">Enhancer</div>
            <ul className="list-disc pl-6 mt-4 text-lg text-left">
              <li className="mt-2">150 AI Interactions per month.</li>
              <li className="mt-2">Unlimited Focus area creation.</li>
              <li className="mt-2">Unlimited Reflections creation.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">Rs.129</div>
              <div className="flex flex-col justify-end text-md ml-1">
                per month
              </div>
            </div>
            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
              onClick={() => {
                Subscribe("Monthly");
              }}
            >
              Subscribe
            </button>
          </div>

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center">
            <div className="text-2xl md:text-4xl font-medium">Annual Plan</div>
            <div className="text-base mt-2">Visionary</div>
            <ul className="list-disc pl-6 mt-4 text-lg text-left">
              <li className="mt-2">200 AI Interactions per month.</li>
              <li className="mt-2">Unlimited Focus area creation.</li>
              <li className="mt-2">Unlimited Reflections creation.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">Rs.999</div>
              <div className="flex flex-col justify-end text-md ml-1">
                per year
              </div>
            </div>
            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
              onClick={() => {
                Subscribe("Annual");
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans ">
      <NavBar />
      <Intro />
      <UsersReview />
      <HowItWorks />
      <BenefitsofJournaling />
      <PricingPlans />
      <Footer />
    </div>
  );
}

export default HomePage;

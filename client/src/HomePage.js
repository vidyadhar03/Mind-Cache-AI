import { useNavigate } from "react-router-dom";
import TypingAnimation from "./utils/TypeAnimation";
import Footer from "./Commons/Footer";
import BenefitsDropdown from "./Components/Benifits";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NavBar from "./Commons/NavBar";
import { trackEvent } from "./utils/PageTracking";
import { getUserDetails } from "./utils/SubscriptionDetails";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserDetails()) {
      navigate(`/topics`);
    }
  }, []);

  function Intro() {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-52px)]  bg-bgc">
        <div className="px-8 text-white text-3xl lg:text-5xl font-bold flex justify-center items-center h-1/3 lg:h-full lg:w-3/5 bg-third-blue">
          <TypingAnimation />
        </div>
        <div className="  flex flex-col items-center justify-center h-2/3 lg:h-full lg:w-2/5  p-2 slide-in-right ">
          <img
            src="/introspectlogo.png"
            className="h-1/2 lg-2/5 w-auto rounded-full mx-2"
            alt="introspect"
          />
          <div className="text-black text-2xl lg:text-4xl text-center mx-2 mt-4 font-medium">
            Gain insights into your mind.
          </div>
          <button
            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-base mt-6"
            onClick={() => {
              trackEvent(
                "click",
                "Buttons",
                "Get Started",
                "Get started from Landing Page"
              );
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
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          Why Mind Cache AI ?
        </div>
        <div className="bg-card text-center mt-8 flex flex-col items-center md:text-xl md:w-2/3 px-2 py-4 md:px-6 md:py-4 border shadow-lg rounded-lg">
          <div className="font-semibold text-lg md:text-2xl">Mind Caching</div>
          <div className="mt-2 md:mt-4 text-sm md:text-base  md:w-2/3">
            A dynamic way to capture and explore the evolving landscape of your
            thoughts, uncovering the subtle patterns that shape your mental
            well-being.
          </div>
          <div className="mt-2 text-sm md:text-base  md:w-2/3">
            Mind Cache AI incorporates scientific principles related to the
            benefits of journaling and structured reflection for mental health.
            These principles are grounded in psychological research that shows
            regular introspection can enhance self-awareness, reduce stress, and
            improve emotional well-being.
          </div>
          <div className="font-semibold mt-4 text-lg md:text-2xl">
            Artificial Intelligence
          </div>
          <div className="mt-2 md:mt-4 text-sm md:text-base  md:w-2/3">
            Mind Cache AI distinguishes itself by integrating AI technology with
            principles of cognitive behavioral therapy (CBT), enhancing
            traditional journaling approaches. This dynamic platform aids users
            in identifying thought and behavior patterns and fosters positive
            changes through engaging insights and suggestions. The AI's active
            analysis of user content transforms introspection into a rewarding
            experience, providing personalized, constructive feedback that
            encourages deeper self-awareness and growth.
          </div>
          <div className=" mt-4 font-semibold text-lg md:text-2xl">
            Transformative Benefits
          </div>
          <div className="mt-2 md:mt-4 text-base  text-center md:w-2/3">
            <BenefitsDropdown />
          </div>
        </div>
      </div>
    );
  }

  function UsersReview() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          Our Most Impactful User Story
        </div>

        <div className="border-2 px-8 py-4 rounded-lg shadow-lg mt-8 md:w-1/2 lg:w-1/3 bg-card">
          <div className=" text-center md:text-lg  text-black font-medium ">
            I have been using your product and I like your idea. This helped me
            show my psychiatrist that I am not okay, and with this, my Bpd
            diagnosis came.
          </div>
          <div className="flex mt-4 justify-center items-center">
            <img
              src="/userprofile.png"
              className="rounded-full h-10 w-10 "
              alt="profile"
            />
            <div className="ml-2 md:text-lg">Susana Teixeria</div>
          </div>
        </div>
      </div>
    );
  }

  function DataPrivacy() {
    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          Commitment to Your Privacy and Security
        </div>

        <div className="bg-card text-center mt-8 flex flex-col items-center md:text-xl md:w-2/3 px-2 py-4 md:px-6 md:py-4 border shadow-lg rounded-lg">
          <div>
            <img src="/dataprivacy.png" className="h-28 w-28 rounded-full"/>
          </div>
          <div className="font-semibold text-lg md:text-2xl my-4">End-To-End Encryption</div>
          <div className=" text-center text-sm md:text-base  text-black font-medium ">
            At Mind Cache AI, we understand the significance of a trusted space
            for personal exploration, akin to the confidentiality shared between
            you and a therapist. That's why we've committed to ensuring
            end-to-end encryption across all facets of your journey on our
            platform—be it Focus Areas, reflections, AI sessions, or messages.
            This level of encryption guards your data from the moment it departs
            your device until it reaches our servers.
          </div>
          <div className=" text-center text-sm md:text-base  text-black font-medium mt-4 ">
            Mirroring the privacy and security found in a therapeutic setting,
            our mission is to create a secure haven for your self-discovery and
            growth. Mind Cache AI aims to be your private, digital sanctuary for
            introspection. Trust in us to protect your journey with the utmost
            integrity and confidentiality.
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
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          How Mind Cache AI works
        </div>
        <div className="flex-col  p-6 md:p-8 w-full ">
          <div className="flex flex-col md:flex-row">
            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 text-center border  rounded-lg shadow-lg  md:mr-2 bg-card">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 1
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Set Your Focus Areas
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="compass.png"
                      className="w-28 h-28 rounded-full"
                      alt="compass"
                    />
                  </div>
                  <div className="mt-0 text-sm md:text-base">
                    Choose areas of life you're curious about or wish to
                    improve, setting the stage for targeted reflection and
                    analysis.
                  </div>
                </div>
              </FadeInDiv>
            </div>

            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 my-6 md:my-0 text-center border  rounded-lg shadow-lg md:ml-2 bg-card">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 2
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Record Your Thoughts
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="pen.png"
                      className="w-28 h-28 rounded-full"
                      alt="pen"
                    />
                  </div>
                  <div className="mt-0 text-sm md:text-base">
                    Regularly journal your reflections to build a comprehensive
                    record of your thoughts and emotional journey over time.
                  </div>
                </div>
              </FadeInDiv>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:mt-4">
            <div className=" w-full md:w-1/2 ">
              <FadeInDiv>
                <div className="p-2 md:p-4 text-center border  rounded-lg shadow-lg md:mr-2 bg-card">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 3
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Reveal Insights with AI Analysis
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="bulb.png"
                      className="w-28 h-28 rounded-full"
                      alt="bulb"
                    />
                  </div>
                  <div className="mt-0 text-sm md:text-base">
                    Leverage AI to analyze your reflections, uncovering patterns
                    and insights that may not be immediately apparent.
                  </div>
                </div>
              </FadeInDiv>
            </div>

            <div className=" w-full md:w-1/2  ">
              <FadeInDiv>
                <div className="p-2 md:p-4 my-6 md:my-0 text-center border  rounded-lg shadow-lg  md:ml-2 bg-card">
                  <div className="text-xl md:text-2xl font-semibold ">
                    Step 4
                  </div>
                  <div className=" text-lg font-medium mt-2">
                    Evaluate Your Transformation Journey
                  </div>
                  <div className="flex justify-center my-2">
                    <img
                      src="chart.png"
                      className="w-28 h-28 rounded-full"
                      alt="chart"
                    />
                  </div>
                  <div className="mt-2 text-sm md:text-base">
                    Track your personal growth over time, assessing how your
                    thoughts and perspectives have evolved through your
                    reflections.
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
      trackEvent(
        "click",
        "Buttons",
        "Subscribe",
        `${plan} subscribe from Landing Page`
      );
      if (getUserDetails()) {
        navigate(`/subscription`, { state: { plan } });
      } else {
        navigate(`/signin`, { state: { plan } });
      }
    }

    return (
      <div className=" flex flex-col px-6 py-8 bg-bgc font-sans">
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          Pricing
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 ">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg  md:mx-4 sm:w-96 text-center bg-card">
            <div className="text-xl md:text-4xl font-medium">Free Plan</div>
            <div className="text-sm mt-2">Explorer</div>
            <ul className="list-disc pl-6 mt-4 md:text-lg text-left">
              <li className="mt-2">15 AI Interactions per month.</li>
              <li className="mt-2">10 Focus area creation limit.</li>
              <li className="mt-2">30 Reflections per Focus area.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">
                <span className="text-2xl font-semibold mr-1">₹</span>0
              </div>
              <div className="flex flex-col justify-end text-md ml-1">
                per month
              </div>
            </div>
            <button
              className="w-full py-2 bg-green-600 text-white md:text-lg rounded-lg font-medium cursor-not-allowed"
              disabled={true}
            >
              Current Subscription
            </button>
          </div>

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center bg-card">
            <div className="text-xl md:text-4xl font-medium">Monthly Plan</div>
            <div className="text-sm mt-2">Enhancer</div>
            <ul className="list-disc pl-6 mt-4 md:text-lg text-left">
              <li className="mt-2">300 AI Interactions per month.</li>
              <li className="mt-2">Unlimited Focus area creation.</li>
              <li className="mt-2">Unlimited Reflections creation.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">
                <span className="text-2xl font-semibold mr-1">₹</span>129
                <span className="mx-2 text-lg font-sans">or</span>
                <span className="text-2xl font-semibold mr-1">$</span>1.5
              </div>
              <div className="flex flex-col justify-end text-md ml-1">
                per month
              </div>
            </div>
            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white md:text-lg rounded-lg font-medium"
              onClick={() => {
                Subscribe("Monthly");
              }}
            >
              Subscribe
            </button>
          </div>

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center bg-card">
            <div className="text-xl md:text-4xl font-medium">Annual Plan</div>
            <div className="text-sm mt-2">Visionary</div>
            <ul className="list-disc pl-6 mt-4 md:text-lg text-left">
              <li className="mt-2">400 AI Interactions per month.</li>
              <li className="mt-2">Unlimited Focus area creation.</li>
              <li className="mt-2">Unlimited Reflections creation.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">
                <span className="text-2xl font-semibold mr-1">₹</span>999
                <span className="mx-2 text-lg font-sans">or</span>
                <span className="text-2xl font-semibold mr-1">$</span>12
              </div>
              <div className="flex flex-col justify-end text-md ml-1">
                per year
              </div>
            </div>
            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white md:text-lg rounded-lg font-medium"
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
      <DataPrivacy />
      <BenefitsofJournaling />
      <PricingPlans />
      <Footer />
    </div>
  );
}

export default HomePage;

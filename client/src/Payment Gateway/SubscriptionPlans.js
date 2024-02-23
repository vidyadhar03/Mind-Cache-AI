import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { useNavigate } from "react-router-dom";

export const SubscriptionPlans = () => {
  const navigate = useNavigate();

  function Subscribe(plan) {
    navigate(`/subscription`, { state: { plan } });
  }

  return (
    <div>
      <NavBar />

      <div className=" flex flex-col px-6 pt-8 md:pt-20 pb-40 bg-bgc font-sans">
        <div className="text-black text-center font-bold text-2xl md:text-4xl">
          Pricing
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 ">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg md:mx-4 w-full sm:w-96 text-center bg-card">
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

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center bg-card">
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

          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg mt-6 md:mt-0 md:mx-4 sm:w-96 text-center bg-card">
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
      <Footer />
    </div>
  );
};

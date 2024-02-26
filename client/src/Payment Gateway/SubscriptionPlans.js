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

      <div className=" flex flex-col px-6 pt-8 pb-20 bg-bgc font-sans items-center">
        <div className="text-black text-center font-bold text-xl md:text-4xl">
          Subscription Plans
        </div>

        <div className="text-sm text-center md:w-2/3 mt-4">
          Upgrade your reflective writing with our AI powered by GPT, providing
          you with up to 200 insightful exchanges monthly. This AI feature
          deepens your journey of self-reflection, offering profound insights
          for an enriched personal exploration.
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-center mt-8 ">
          <div className="px-4 py-8 flex-col border-2 rounded-xl shadow-lg  md:mx-4 sm:w-96 text-center bg-card">
            <div className="text-xl md:text-4xl font-medium">Free Plan</div>
            <div className="text-sm mt-2">Explorer</div>
            <ul className="list-disc pl-6 mt-4 md:text-lg text-left">
              <li className="mt-2">10 AI Interactions per month.</li>
              <li className="mt-2">10 Focus area creation limit.</li>
              <li className="mt-2">30 Reflections per Focus area.</li>
            </ul>
            <div className="flex justify-center mt-16 mb-4">
              <div className="text-4xl font-medium">Rs.0</div>
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
      <Footer />
    </div>
  );
};

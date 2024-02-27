import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { useNavigate, useLocation } from "react-router-dom";

export function SubscriptionStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.status;
  const error = location.state?.error;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgc font-sans">
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center">
        {status === "active" ? (
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src="/SubSuccess.png"
                className="h-40 w-40 rounded-full"
                alt=""
              />
            </div>
            <div className="text-center text-2xl mt-8">
              Subscription successfully activated!
            </div>
            <div className="text-center mt-8">
              Thank you for choosing Mind Cache AI! Embark on your journey of
              self-discovery and personal enrichment.
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src="/SubFailure.png"
                className="h-40 w-40 rounded-full"
                alt=""
              />
            </div>
            <div className="text-center text-2xl mt-8">
              Your Subscription attempt has failed!
            </div>
            <div className="text-center text-xl mt-8 ">Error: {error}</div>
          </div>
        )}
        <button
          className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium mt-8 mb-60"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Go to Dashboard
        </button>
      </div>
      <Footer />
    </div>
  );
}

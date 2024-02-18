import { useNavigate } from "react-router-dom";

export const SubscriptionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col items-center justify-center bg-bgc font-sans">
      <div>Subscription Details</div>
      <button
        className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
        onClick={() => {
          const plan = "Monthly";
          navigate(`/subscription`, { state: { plan } });
        }}
      >
        Subscribe
      </button>
    </div>
  );
};

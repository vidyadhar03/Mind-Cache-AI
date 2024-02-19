import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Commons/Footer";

export function RefundsAndCancellations() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgc font-sans">
      <div className=" py-20 px-8 md:px-20 ">

        <div
          className=" flex justify-center items-center  cursor-pointer"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img
            src="/mindcachelogo.png"
            className="w-16 h-16 rounded-full mr-4"
            alt="website logo"
          />
          <div className="text-fifth-blue text-2xl sm:text-4xl font-bold">
            Mind Cache AI
          </div>
        </div>

        <div className="flex justify-center text-lg md:text-2xl my-8 font-semibold">
          Refund & Cancellation Policy
        </div>

        <div className="text-base md:text-lg text-black md:w-4/5">
          {" "}
          Not satisfied with your purchase? Review our policies on refunds and
          returns to know your rights.
        </div>

        <div className="font-semibold text-lg md:text-2xl my-8">REFUND</div>

        <div className="text-base md:text-lg text-black md:w-4/5">
          <p className="mb-4">
            We understand that plans can change, which is why we offer a
            hassle-free refund process. If you find yourself needing to cancel
            your subscription, you can do so within a 30-day window from the
            start of your subscription, no questions asked.
          </p>
          <p className="mb-4">
            To request a refund, simply inform us within 30 days of the
            commencement of your subscription by reaching out to us at:{" "}
            <a
              href="mailto:mindcacheai03@gmail.com"
              className="text-blue-500 hover:text-blue-700"
            >
              mindcacheai03@gmail.com
            </a>
            . Upon receiving your request, we will initiate the refund process
            promptly.
          </p>
          <p className="mb-4">
            Please note that refunds are processed within <span className="font-semibold text-base md:text-lg">5-7 working days</span>. The
            refunded amount will be credited back to your bank account within
            this timeframe. We appreciate your patience and understanding as we
            work to ensure a smooth and efficient refund process.
          </p>
          <p>Thank you for choosing our services.</p>
        </div>

        <div className="font-semibold text-lg md:text-2xl my-8">
          CANCELLATION
        </div>

        <div className="text-base md:text-lg text-black md:w-4/5">
          You're free to cancel your subscription anytime you wish.
        </div>
      </div>

      <Footer />
    </div>
  );
}

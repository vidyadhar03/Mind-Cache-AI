import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "./SubscriptionDetails";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      window.gtag("config", "G-5L5BPP71VR", {
        page_path: location.pathname + location.search,
      });
    };

    handleRouteChange();
  }, [location]);
};

export const trackEvent = (action, category, label, value) => {
  const userDetails = getUserDetails();
  try {
    if (userDetails.userid) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        user_id: userDetails.userid,
      });
    } else {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        user_id: "",
      });
    }
  } catch (e) {
    // console.log(e);
  }
};

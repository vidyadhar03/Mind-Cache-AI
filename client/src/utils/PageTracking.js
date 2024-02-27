import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    user_id: localStorage.getItem("userid"), 
  });
};

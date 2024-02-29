import { AccountDetails } from "./AccountDetails";
import { SubscriptionDetails } from "./SubscriptionDetails";

export const ContentDisplay = ({
  activeTab,
  showConfirm,
  setText,
  triggercancel,
  setTriggercancel,
}) => {
  switch (activeTab) {
    case "AccountDetails":
      return <AccountDetails />;
    case "SubscriptionDetails":
      return (
        <SubscriptionDetails
          showConfirm={showConfirm}
          setText={setText}
          triggercancel={triggercancel}
          setTriggercancel={setTriggercancel}
        />
      );
    default:
      return <AccountDetails />;
  }
};

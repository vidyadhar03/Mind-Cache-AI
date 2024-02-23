import { AccountDetails } from "./AccountDetails";
import { SubscriptionDetails } from "./SubscriptionDetails";

export const ContentDisplay = ({ activeTab }) => {
  switch (activeTab) {
    case "AccountDetails":
      return <AccountDetails />;
    case "SubscriptionDetails":
      return <SubscriptionDetails />;
    default:
      return <AccountDetails />;
  }
};

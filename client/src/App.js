import Topics from "./Components/Topics";
import Thoughts from "./Components/Thoughts";
import ChatComponent from "./Components/ChatComponent";
import SignIn from "./Account/Signin";
import HomePage from "./HomePage";
import { RefundsAndCancellations } from "./policies/RefundsAndCancellations";
import { UserProfile } from "./Account/UserProfile";
import { CreateSubscription } from "./Payment Gateway/SubscriptionCreation";
import SubscriptionConfirmation from "./Payment Gateway/SubscriptionConfirmation";
import { SubscriptionPlans } from "./Payment Gateway/SubscriptionPlans";
import { SubscriptionStatus } from "./Payment Gateway/SubscriptionStatus";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { DataProvider } from "./utils/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <RouteswithNavBar />
      </Router>
    </DataProvider>
  );
}

function RouteswithNavBar() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<Thoughts />} />
        <Route path="/analyse" element={<ChatComponent />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<UserProfile />} />
        <Route path="/subscription" element={<CreateSubscription/>} />
        <Route path="/subscription-confirmation" element={<SubscriptionConfirmation/>} />
        <Route path="/subscription-status" element={<SubscriptionStatus/>} />
        <Route path="/pricing" element={<SubscriptionPlans/>}/>
        <Route
          path="/refund-and-cancellation"
          element={<RefundsAndCancellations />}
        />
      </Routes>
    </>
  );
}

export default App;

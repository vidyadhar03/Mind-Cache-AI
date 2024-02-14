// import logo from './logo.svg';
// import "./App.css";
import Topics from "./Components/Topics";
import Thoughts from "./Components/Thoughts";
import ChatComponent from "./Components/ChatComponent";
import SignIn from "./Account/Signin";
import HomePage from "./HomePage";
import { RefundsAndCancellations } from "./policies/RefundsAndCancellations";
import { UserProfile } from "./Account/UserProfile";
import { CreateSubscription } from "./Payment Gateway/SubscriptionCreation";
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
  // const location = useLocation();
  // const user = localStorage.getItem("userid");

  // console.log(
  //   "user info : " + localStorage.getItem("userid"),
  //   localStorage.getItem("usertoken")
  // );
  // const hideNavBarRoutes = ["/analyse", "/signin", "/refund-and-cancellation","/topics"];
  // const showNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {/* {showNavBar && <NavBar />} */}
      <Routes>
        {/* {user ? (
          <Route path="/" element={<Topics />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )} */}
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<Thoughts />} />
        <Route path="/analyse" element={<ChatComponent />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<UserProfile />} />
        <Route path="/subscription" element={<CreateSubscription/>} />
        <Route
          path="/refund-and-cancellation"
          element={<RefundsAndCancellations />}
        />
      </Routes>
    </>
  );
}

export default App;

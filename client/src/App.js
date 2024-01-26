// import logo from './logo.svg';
import "./App.css";
import NavBar from "./Commons/NavBar";
import Topics from "./Components/Topics";
import Thoughts from "./Components/Thoughts";
import ChatComponent from "./Components/ChatComponent";
import SignIn from "./Auth/Signin";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
  const location = useLocation();
  const user = localStorage.getItem("userid");

  console.log("user info : "+ localStorage.getItem("userid"), localStorage.getItem("usertoken"))
  const hideNavBarRoutes = ["/analyse", "/signin"];
  const showNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
    {showNavBar&&<NavBar/>}
    <Routes>
      {user ? (
        <Route path="/" element={<Topics />} />
      ) : (
        <Route path="/" element={<HomePage />} />
      )}

      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topic" element={<Thoughts />} />
      <Route path="/analyse" element={<ChatComponent />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </>
    
  );
}

export default App;

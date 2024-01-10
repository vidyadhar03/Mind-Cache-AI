// import logo from './logo.svg';
import "./App.css";
import NavBar from "./Commons/NavBar";
import HeadLanding from "./Head Space/HeadLanding";
import Topics from "./Head Space/Topics";
import Thoughts from "./Head Space/Thoughts";
import ChatComponent from "./Head Space/ChatComponent";
import SignIn from "./Auth/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./utils/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <Routes> 
          <Route path="/" element={<HeadLanding />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Thoughts/>}/>
          <Route path="/analyse" element={<ChatComponent/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

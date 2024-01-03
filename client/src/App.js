// import logo from './logo.svg';
import "./App.css";
import NavBar from "./Commons/NavBar";
import HomePage from "./HomePage";
import HeadLanding from "./Head Space/HeadLanding";
import Topics from "./Head Space/Topics";
import Thoughts from "./Head Space/Thoughts";
import ChatComponent from "./Head Space/ChatComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./utils/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <Routes> 
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HeadLanding />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Thoughts/>}/>
          <Route path="/analyse" element={<ChatComponent/>}/>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

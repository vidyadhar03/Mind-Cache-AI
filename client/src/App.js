// import logo from './logo.svg';
import "./App.css";
import NavBar from "./Commons/NavBar";
import HomePage from "./HomePage";
import HeadLanding from "./Head Space/HeadLanding";
import Topics from "./Head Space/Topics";
import Thoughts from "./Head Space/Thoughts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./utils/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/headspace" element={<HeadLanding />} />
          <Route path="/headspace/topics" element={<Topics />} />
          <Route path="/headspace/topics/:topic" element={<Thoughts/>}/>
          {/* <Route path="/headspace" element={<Topics/>}/>
        <Route path="/bodyspace" element={<SetDailyGoal/>}/>
        <Route path="/workspace" element={<Worklanding/>}/> */}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

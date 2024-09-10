import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Helloworld from "./components/pages/Helloworld";
import TopTracks from "./components/pages/TopTracks";
import Challenges from "./components/pages/Challenges";
import DailySong from "./components/pages/DailySong";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/helloworld" element={<Helloworld></Helloworld>}></Route>
          <Route path="/topTracks" element={<TopTracks></TopTracks>}></Route>
          <Route path="/challenges" element={<Challenges></Challenges>}></Route>
          <Route path="/daily" element={<DailySong></DailySong>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
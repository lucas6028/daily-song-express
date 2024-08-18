import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import "./App.css";
import Helloworld from "./components/pages/Helloworld";
import TopTracks from "./components/pages/TopTracks";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/helloworld" element={<Helloworld></Helloworld>}></Route>
          <Route path="/topTracks" element={<TopTracks></TopTracks>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
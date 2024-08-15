import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
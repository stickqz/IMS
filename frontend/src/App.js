import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Form/Register.js";
import LandingPage from "./components/Landing/LandingPage.js";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

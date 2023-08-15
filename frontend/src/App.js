import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Form/Register.js";
import LandingPage from "./components/Landing/LandingPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

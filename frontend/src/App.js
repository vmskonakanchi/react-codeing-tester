import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import "toastify-js/src/toastify.css"
import Results from "./pages/Results";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

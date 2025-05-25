import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import MainTrackerPage from "./pages/MainTracker/MainTrackerPage";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tracker" element={<MainTrackerPage />} />
      </Routes>
    </Router>
  );
}

export default App;

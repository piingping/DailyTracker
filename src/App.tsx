import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import MainTrackerPage from "./pages/MainTracker/MainTrackerPage";
import RecordPage from "./pages/RecordPage/RecordPage";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tracker" element={<MainTrackerPage />} />
        <Route path="/Record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
}

export default App;

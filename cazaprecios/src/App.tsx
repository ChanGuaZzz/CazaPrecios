import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.tsx";
import Login from "./pages/login.tsx";
import Comparator from "./pages/comparator.tsx";
import Profile from "./pages/profile.tsx";

function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comparator" element={<Comparator/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

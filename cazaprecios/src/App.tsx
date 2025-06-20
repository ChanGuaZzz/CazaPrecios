import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.tsx";
import Login from "./pages/login.tsx";
import Comparator from "./pages/comparator.tsx";
import Profile from "./pages/profile.tsx";
import Header from "./components/Header.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";

function App() {
  return (
    <>
    <AppProvider>
      <Router basename="/" >
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comparator" element={<Comparator />} />
          <Route path="/comparator/:productString" element={<Comparator />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppProvider>
    </>
  );
}

export default App;

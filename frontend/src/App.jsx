import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isAuthenticated } from "./api/auth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./assets/pages/Home";
import Contact from "./assets/pages/Contact";
import Bands from "./assets/pages/Bands";
import Catalog from "./assets/pages/Catalog";
import Navbar from "./components/Navbar.jsx";
export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/dashboard"
            element={
              isAuth ? <Dashboard setIsAuth={setIsAuth} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}

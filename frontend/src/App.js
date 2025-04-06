import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "./firebase";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StudentDashboard  from "./pages/StudentDashboard";
import MentorDashboard  from "./pages/MentorDashboard";
import Security from "./pages/Security";
import { auth } from "./firebase";
import ErrorPage from "./pages/ErrorPage";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/student" element={user ? <StudentDashboard /> : <Navigate to="/" />} />
        <Route path="/mentor" element={user ? <MentorDashboard /> : <Navigate to="/" />} />
        <Route path="/security" element={user ? <Security /> : <Navigate to="/" />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

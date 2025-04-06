import React from "react";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user"); // Clear session
        setUser(null);
        navigate("/");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {user?.displayName}</h2>
      <img src={user?.photoURL} alt="User" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
      <p>Email: {user?.email}</p>
      <button onClick={() => navigate("/student")}>Go to Student Page</button>
      <button onClick={() => navigate("/mentor")}>Go to Mentor Page</button>
      <button onClick={() => navigate("/security")}>Go to Security Page</button>
      <br /><br />
      <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "10px 20px" }}>
        Logout
      </button>
    </div>
  );
};

export default Home;

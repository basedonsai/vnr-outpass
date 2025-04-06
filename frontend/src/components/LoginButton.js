import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      await axios.post("http://localhost:5000/api/auth/login", { token }, { withCredentials: true });

      alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default LoginButton;

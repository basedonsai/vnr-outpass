import { useEffect, useState } from "react";
import { getAuth,GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const allowedMentorEmails = ["aveenonights@gmail.com", "vnr.cse.a.2022@gmail.com"];

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Automatically detect user session
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User is already logged in:", user.email);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const handleLogin = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      console.log("Logged in as:", email);

      if (/^[a-zA-Z0-9]{10}@vnrvjiet\.in$/i.test(email)) {
        window.location.href = "/student";
      } else if (allowedMentorEmails.includes(email)) {
        window.location.href = "/mentor";
      } else {
        setError("Access denied. This platform is only for Students & Mentors.");
        setTimeout(() => signOut(auth), 2000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">College OutPass System</h1>
      
      {user ? (
        <p className="text-green-500">✅ You are already logged in as {user.email}</p>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;

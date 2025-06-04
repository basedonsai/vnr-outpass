import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const allowedMentorEmails = ["aveenonights@gmail.com", "vnr.cse.a.2022@gmail.com"];

const Mentor = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      const userEmail = auth.currentUser.email;
      setEmail(userEmail);
      setIsAllowed(allowedMentorEmails.includes(userEmail));
    }
  }, [auth.currentUser]);

  if (!isAllowed) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-red-100">
        <h2 className="text-red-500 text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2">This page is restricted to Mentors only.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-700">Welcome, Mentor!</h1>
      <p className="text-gray-700 mt-2">Your Email: {email}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Mentor;
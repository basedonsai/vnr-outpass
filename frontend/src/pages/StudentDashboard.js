import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      const userEmail = auth.currentUser.email;
      setEmail(userEmail);
      setIsAllowed(/^[a-zA-Z0-9]{10}@vnrvjiet\.in$/.test(userEmail));
    }
  }, [auth.currentUser]);

  if (!isAllowed) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-red-100">
        <h2 className="text-red-500 text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2">This page is restricted to Students only.</p>
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
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Welcome, Student!</h1>
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

export default Student;

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PermissionForm from "./PermissionForm"; // ✅ import your modal component

const Student = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // ✅ modal state

  useEffect(() => {
    if (auth.currentUser) {
      const userEmail = auth.currentUser.email;
      setEmail(userEmail);
      const match = userEmail.match(/^([a-zA-Z0-9]{10})@vnrvjiet\.in$/);
      if (match) {
        setRollNumber(match[1]);
        setIsAllowed(true);
      }
    }
  }, [auth.currentUser]);

  const handlePermissionAdded = (data) => {
    console.log("New Permission Request:", data);
    // Optionally update UI with new request
  };

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
    <div className="min-h-screen px-6 py-8 bg-green-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          Welcome, Student!
        </h1>
        <p className="text-center text-lg mb-1">Email: {email}</p>
        <p className="text-center text-md text-gray-600 mb-6">
          Roll Number: <span className="font-medium">{rollNumber}</span>
        </p>

        <hr className="border-t-2 border-green-300 mb-6" />

        {/* Previous Applications Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Previous GatePass Applications</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">No applications yet.</p>
          </div>
        </section>

        {/* Apply for GatePass Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Apply for a GatePass</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={() => setModalOpen(true)}
            >
              Request Permission
            </button>
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>

      {/* ✅ Permission Modal */}
      <PermissionForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPermissionAdded={handlePermissionAdded}
      />
    </div>
  );
};

export default Student;

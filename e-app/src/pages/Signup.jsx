import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SignupForm from "../components/forms/SignupForm";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <SignupForm />
      </div>
    </>
  );
}
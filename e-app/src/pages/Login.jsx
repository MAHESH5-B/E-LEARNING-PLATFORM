import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../context/AuthContext";

export default function Login() {
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
        <LoginForm />
      </div>
    </>
  );
}
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      setUser(result.user);

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      setUser(result.user);

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-700 flex items-center justify-center flex-col">
      {isLogin ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <RegisterForm onSubmit={handleRegister} />
      )}
      <button
        className="mt-4 text-white underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;

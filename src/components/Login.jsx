import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }
    sessionStorage.setItem("user", email);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-10 rounded-3xl shadow-2xl w-96 border border-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
          Task Manager
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white w-full py-3 rounded-2xl hover:bg-purple-700 font-semibold transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

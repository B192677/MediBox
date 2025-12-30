import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../components/logo.jpg";
import { CartContext } from "../context/CartContext";

const Login = ({ onLoginSuccess,onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false); //toggle logout
  

  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user"); //  fix case (was "User")

     if (token && storedUser && storedUser !== "undefined") {
    try {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to parse storedUser:", err);
      localStorage.removeItem("user"); // cleanup invalid data
    }
  }
}, []);


 

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/u/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();

        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.User)); // i removed res keep it  key must match
        setUser(data.User);
        
        alert("Login successful!");
        if (onLoginSuccess) onLoginSuccess(data.User);

        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("favourites")
  //   setFavourites([]);
    
   if(onLogout){
    onLogout();
   }
  //    setUser(null);
  // setIsLoggedIn(false);

  // clearWishList();
  //   clearCart();

    alert("Logged out successfully!");
    // setIsLoggedIn(false);
    // setUser(null);
    setShowLogout(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {!isLoggedIn ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="MediBox" className="h-12 w-12" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-4">Log in to your MediBox account.</p>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
            <button onClick={()=>navigate("/forgot")}
            className="text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
             style={{background:"blue"}}
             
          >
            Log In
          </button>

          {/* Footer */}
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
          <img src={logo} alt="MediBox" className="mx-auto h-12 w-12 mb-4" />

          {/* Clickable user greeting */}
          <div
            className="cursor-pointer select-none"
            onClick={() => setShowLogout(!showLogout)}
          >
            <h2 className="text-lg font-semibold text-black">
              Welcome, {User?.name || "User"} !!
            </h2>
          </div>

          {/* Logout button shown only if toggled */}
          {showLogout && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-md bg-red-500 text-black py-2 font-medium hover:bg-red-600 transition"
             
            >
              Logout
            </button>
          )}
        </div>
      )} 
         <div class="backbtn">
          <button
              onClick={() => window.history.back()}
              className="text-gray-600 fixed left-130 top-35 hover:text-gray-900 "
              style={{background:"white"}}
            >
              {/* Back Icon */}
              <svg
                fill="currentColor"
                height="24"
                width="24"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
              </svg>
            </button>
            </div>
    </div>

         
  );
};

export default Login;

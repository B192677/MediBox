//ForgotPassword.jsx                                                                                                                                                                                                                             import React, { useState } from "react";
//import api from "../api/apiClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");      // success message
  const [err, setErr] = useState("");      // error message
  const [loading, setLoading] = useState(false);

  const api = axios.create({ baseURL: "http://localhost:3001" });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!email) {
      setErr("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      // Endpoint: adjust if your backend uses a different path
      const res = await api.post("/u/forgot", { email });
      const token = localStorage.setItem("currentuser",JSON.stringify(email));
    //   const response = await fetch('/forgot', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   });


      setMsg(res.data?.msg || "Reset link sent to your email (check spam).");
    } catch (error) {
      setErr(error?.response?.data?.msg || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800 p-8 rounded-lg w-96 mx-auto shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

          <p className="mb-4 text-sm text-slate-300 text-center">
            Enter your account email and we'll send a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 focus:outline-none"
            />

            {err && <div className="text-red-400 text-sm">{err}</div>}
            {msg && <div className="text-green-400 text-sm">{msg}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 py-2 rounded hover:bg-sky-600 transition-colors"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-400">
            <Link to="/login" className="text-sky-400 hover:underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
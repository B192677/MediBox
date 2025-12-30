                                                                                                                               import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function ResetPassword() {
 const { token } = useParams();  // 👈 token capture ayindi
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(""); 
  const [msg, setMsg] = useState(""); 

  const api = axios.create({ baseURL: "http://localhost:3001" });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  });

  const scorePassword = (pw) => {
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score++;
    if (`/[a-z]/.test(pw) && /[A-Z]/.test(pw)`) score++;
    if (`/\\d/.test(pw)`) score++;
    if (`/[^A-Za-z0-9]/.test(pw)`) score++;
    if (pw.length >= 12) score++;
    return Math.min(score, 5);
  };

  const strength = scorePassword(newPw);
  const valid = newPw.length >= 8 && newPw === confirmPw;

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = localStorage.getItem("currentuser");
    console.log("in frontend submit resetpassword", email);
    if (!valid) return;
    const password =confirmPw;

    try {
        //const { token } = useParams();
         let setNewPassword = {
        email: email, 
        password: password, 

      };
        console.log("234");
         const res = await api.post("/u/reset",setNewPassword);
         console.log('Response', res.data);
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    }
  };*/
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

   const email = localStorage.getItem("currentuser");
    console.log("in frontend submit resetpassword", email);
    if (!valid) return;
    const password =confirmPw;
    try {
         let setNewPassword = {
        email: email, 
        password: password, 
         }
      // Endpoint: adjust if your backend uses a different path
      const res = await api.post("/u/reset", setNewPassword);
        console.log('Response', res.data);
         
      setMsg(res.data?.msg || "Reset link sent to your email (check spam).");
    } catch (error) {
      setErr(error?.response?.data?.msg || "Error sending reset link");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0b0c0d] to-[#111214] px-4">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-400 text-center mb-2">
          Create New Password
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter a secure new password and confirm it to update your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">+
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="newPw">
              New Password
            </label>
            <input
              id="newPw"
              type={show ? "text" : "password"}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter new password"
            />
            <div className="h-2 w-full bg-white/10 rounded mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  strength <= 1
                    ? "bg-red-400 w-1/5"
                    : strength <= 3
                    ? "bg-yellow-400 w-3/5"
                    : "bg-green-400 w-full"
                }`}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              At least 8 characters. Mix upper/lower, numbers, symbols for a stronger password.
            </p>
          </div>

          <div>
            <label
              className="block text-sm text-gray-400 mb-1"
              htmlFor="confirmPw"
            >
              Confirm Password
            </label>
            <input
              id="confirmPw"
              type={show ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Re-type new password"
            />
            <button
              type="button"
              className="text-xs text-gray-400 hover:text-gray-200 mt-2"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"} Passwords
            </button>
            {confirmPw && (
              <p
                className={`text-xs mt-1 ${
                  newPw === confirmPw ? "text-green-400" : "text-red-400"
                }`}
              >
                {newPw === confirmPw
                  ? "Passwords match."
                  : "Passwords do not match."}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!valid}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition-all duration-200 ${
              valid
                ? "bg-cyan-500 hover:bg-cyan-600"
                : "bg-cyan-500 opacity-50 cursor-not-allowed"
            }`}
          >
            Set New Password
          </button>

          <a
            href="/login"
            className="block text-center text-sm text-cyan-400 hover:underline"
          >
            Back to Login
          </a>
        </form>
      </div>
    </div>
  );
}
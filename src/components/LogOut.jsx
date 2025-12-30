// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const LogoutPage = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear stored login info
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("user");

//     console.log("User logged out");

//     // Trigger callback if provided
//     if (onLogout) {
//       onLogout();
//     }

//     // Redirect back to login page
//     navigate("/login");
//   };

//   // Logout immediately when this page loads
//   useEffect(() => {
//     handleLogout();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="w-full max-w-sm p-6 text-center bg-gray-800 rounded-2xl shadow-lg">
//         <h2 className="text-white text-2xl font-bold mb-6">
//           You’ve been logged out
//         </h2>
//         <button
//           onClick={() => navigate("/login")}
//           className="w-full rounded-lg font-bold h-14 text-lg transition-all duration-200 bg-green-800 hover:bg-green-600 text-gray-900 hover:shadow-lg transform hover:scale-[1.02]"
//         >
//           Go to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LogoutPage;

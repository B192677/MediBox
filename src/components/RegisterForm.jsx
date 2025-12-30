import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg"
const RegisterForm = ({ onRegisterSuccess }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegisterInputChange = useCallback(
    (field) => (e) => {
      setRegisterData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  const validatePasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    return checks;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!registerData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!registerData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(registerData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!registerData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordChecks = validatePasswordStrength(registerData.password);
      const failedChecks = Object.entries(passwordChecks)
        .filter(([_, passed]) => !passed)
        .map(([rule]) => rule);

      if (failedChecks.length > 0) {
        newErrors.password =
          "Password must contain: " +
          failedChecks
            .map((rule) => {
              switch (rule) {
                case "length":
                  return "at least 8 characters";
                case "uppercase":
                  return "an uppercase letter";
                case "lowercase":
                  return "a lowercase letter";
                case "digit":
                  return "a number";
                case "special":
                  return "a special character";
                default:
                  return "";
              }
            })
            .join(", ");
      }
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/u/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          gender: registerData.gender,
          mobile: registerData.mobile,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (onRegisterSuccess) onRegisterSuccess(data);
        else alert("Registration successful!");
        navigate("/login");
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ general: "Something went wrong, please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-12">
            <div className="text-black text-6xl mb-4">   <img src={logo} alt="MediBox Logo" className="h-20 w-20 object-contain absolute top-8 left-230" /> </div>
            <h1 className="text-blue-400 text-xl font-bold mt-4">
              Join Medibox
            </h1>
            <p className="text-black-600 mt-2">Create your account</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-3 bg-red-900 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm text-center">
                {errors.general}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <label className="block text-sm font-semibold text-black">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterInputChange("name")}
              className="w-full rounded-lg bg-white border text-black h-14 px-4"
              disabled={isLoading}
              required
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}

            <label className="block text-sm font-semibold text-black">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              value={registerData.mobile}
              onChange={handleRegisterInputChange("mobile")}
              maxLength={10}
              className="w-full rounded-lg bg-white border text-black h-14 px-4"
              disabled={isLoading}
              required
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs">{errors.mobile}</p>
            )}

            <label className="block text-sm font-semibold text-black">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterInputChange("email")}
              className="w-full rounded-lg bg-white border text-black h-14 px-4"
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email}</p>
            )}

            <label className="block text-sm font-semibold text-black">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={registerData.gender}
              onChange={handleRegisterInputChange("gender")}
              className="w-full rounded-lg bg-white border text-gray-500 h-14 px-4"
              disabled={isLoading}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-xs">{errors.gender}</p>
            )}

            <label className="block text-sm font-semibold text-black">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterInputChange("password")}
              className="w-full rounded-lg bg-white border text-black h-14 px-4"
              disabled={isLoading}
              required
            />
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password}</p>
            )}

            <label className="block text-sm font-semibold text-black">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterInputChange("confirmPassword")}
              className="w-full rounded-lg bg-white border text-black h-14 px-4"
              disabled={isLoading}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Register Button */}
          <div className="mt-4">
            <button
              onClick={handleRegister}
              disabled={isLoading}
              style={{
                background: isLoading ? "purple" : "blue",
                color: isLoading ? "gray" : "white",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              className="w-full rounded-lg font-bold h-14 text-lg transition-all duration-200"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Already have an account */}
          <div className="mt-4 text-center">
            <p className="text-black">
              Already have an account?{" "}
              <button
                className="font-semibold text-blue-600 hover:text-blue-600"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

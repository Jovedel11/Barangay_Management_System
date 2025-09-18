import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    useOtp: false,
    otpCode: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const { login, loginWithOtp, verifyOtp, loading, error, clearError } =
    useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    clearError();
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // success - auth state will update automatically
      console.log("Login successful");
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      const result = await loginWithOtp(formData.email);
      if (result.success) {
        setOtpSent(true);
      }
    } else {
      const result = await verifyOtp(formData.email, formData.otpCode);
      if (result.success) {
        // success - auth state will update automatically
        console.log("OTP verified successfully");
      }
    }
  };

  const resetOtpForm = () => {
    setOtpSent(false);
    setFormData((prev) => ({ ...prev, otpCode: "" }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign In to Barangay Portal
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            name="useOtp"
            checked={formData.useOtp}
            onChange={handleInputChange}
            className="mr-2"
            disabled={loading}
          />
          Use passwordless login (Email OTP)
        </label>
      </div>

      {!formData.useOtp ? (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
              disabled={loading || otpSent}
            />
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                name="otpCode"
                value={formData.otpCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 6-digit code"
                maxLength="6"
                required
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Check your email for the verification code
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? otpSent
                ? "Verifying..."
                : "Sending code..."
              : otpSent
              ? "Verify Code"
              : "Send Verification Code"}
          </button>

          {otpSent && (
            <button
              type="button"
              onClick={resetOtpForm}
              className="w-full text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
              disabled={loading}
            >
              Use different email
            </button>
          )}
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

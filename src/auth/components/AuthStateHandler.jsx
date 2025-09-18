import React from "react";
import { useAuth, AUTH_STATES } from "../context/AuthProvider";
import { LoginForm } from "../Login";
import { ProfileCreationForm } from "../components/ProfileCreationForm";

export const AuthStateHandler = ({ children }) => {
  const { authState, loading, user, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  switch (authState) {
    case AUTH_STATES.UNAUTHENTICATED:
      return <LoginForm />;

    case AUTH_STATES.EMAIL_UNVERIFIED:
      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Check Your Email
          </h2>
          <p className="text-gray-600">
            We've sent a verification link to <strong>{user?.email}</strong>.
            Please click the link to verify your account.
          </p>
          <div className="mt-4">
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Back to Login
            </a>
          </div>
        </div>
      );

    case AUTH_STATES.PROFILE_INCOMPLETE:
      return <ProfileCreationForm />;

    case AUTH_STATES.PENDING_APPROVAL:
      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">
            Pending Approval
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for completing your registration,{" "}
            <strong>{profile?.full_name}</strong>!
          </p>
          <p className="text-gray-600">
            Your account is currently under review by our administrators. You
            will receive an email notification once your account is approved.
          </p>
          <div className="mt-6">
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      );

    case AUTH_STATES.REJECTED:
      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Application Rejected
          </h2>
          <p className="text-gray-600 mb-4">
            Unfortunately, your application has been rejected.
          </p>
          <p className="text-gray-600">
            Please contact the barangay office for more information.
          </p>
          <div className="mt-6">
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      );

    case AUTH_STATES.SUSPENDED:
      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Account Suspended
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been temporarily suspended.
          </p>
          <p className="text-gray-600">
            Please contact the barangay office to resolve this issue.
          </p>
          <div className="mt-6">
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      );

    case AUTH_STATES.ACTIVE:
      // user is fully authenticated and approved
      return children;

    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Unknown authentication state</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
  }
};

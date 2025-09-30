export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "EMAIL_EXISTS":
        return "An account with this email already exists. Please use a different email or try logging in.";
      case "MISSING_REQUIRED_FIELDS":
        return "Please fill in all required fields.";
      case "INVALID_EMAIL":
        return "Please enter a valid email address.";
      case "INVALID_PHONE":
        return "Please enter a valid Philippine phone number (e.g., +63 912 345 6789).";
      case "PASSWORD_MISMATCH":
        return "Passwords do not match.";
      case "PASSWORD_TOO_SHORT":
        return "Password must be at least 8 characters long.";
      case "INTERNAL_ERROR":
        return "An error occurred during registration. Please try again.";
      default:
        return "Registration failed. Please try again.";
    }
  };
export const getNextStepMessage = (nextStep) => {
    switch (nextStep) {
      case "email_verification":
        return "Please check your email and click the verification link.";
      case "admin_approval":
        return "Your email is verified. Please wait for admin approval.";
      case "contact_support":
        return "Please contact support for assistance.";
      case "two_factor_auth":
        return "Two-factor authentication is required for admin access.";
      default:
        return null;
    }
  };

    // Error messages
export const getErrorMessage = (error) => {
    switch (error) {
      case "INVALID_CREDENTIALS":
        return "Invalid email or password. Please check your credentials.";
      case "EMAIL_NOT_VERIFIED":
        return "Please verify your email address before signing in.";
      case "ACCOUNT_PENDING":
        return "Your account is pending approval from an administrator.";
      case "ACCOUNT_DISABLED":
        return "Your account has been disabled. Please contact support.";
      case "MISSING_CREDENTIALS":
        return "Please enter both email and password.";
      case "TOO_MANY_ATTEMPTS":
        return "Too many login attempts. Please try again later.";
      default:
        return "An error occurred during sign in. Please try again.";
    }
  };
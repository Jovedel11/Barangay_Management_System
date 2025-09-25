const signUp = async (userData) => {
  // Simulate API call
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.status === 400) {
      return {
        success: false,
        error: "EMAIL_EXISTS",
        message: "Email is already taken. Please enter another email",
        nextStep: null,
      };
    }
    return {
      success: true,
      message: "Account created successfully! Please wait for admin approval.",
      next_step: "admin_approval",
    };
  } catch (error) {
    console.error("Sign-up error:", error);
    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "An internal error occurred. Please try again later.",
      nextStep: null,
    };
  }
};

export default signUp;

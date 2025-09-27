const sendOtp = async (code) => {
  // Simulate API call
  try {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    if (response.status === 400) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error("Sign-up error:", error);
    return {
      success: false,
    };
  }
};

export default sendOtp;

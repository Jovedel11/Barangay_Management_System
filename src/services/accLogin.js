const accLogin = async (email, password) => {
  // Simulate API call
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (response.status === 401) {
      // This means incorrect credentials
      return { ...result, error: true };
    }
    return {
      ...result,
    };
  } catch (error) {
    // Internal server error or network error
    console.error("Login error:", error);
    return {
      success: false,
    };
  }
};

export default accLogin;

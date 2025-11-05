const signUp = async (userData) => {
  try {
    const formData = new FormData();

    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("resident_address", userData.resident_address);
    formData.append("residency_status", userData.residency_status);

    if (userData.phone_number) {
      formData.append("phone_number", userData.phone_number);
    }

    if (userData.barangay_id_image) {
      formData.append("barangay_id_image", userData.barangay_id_image);
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    if (response.status === 400) {
      return {
        success: false,
        error: "EMAIL_EXISTS",
        message: "Email is already taken. Please enter another email",
        nextStep: null,
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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

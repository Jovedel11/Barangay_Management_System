import emailjs from "@emailjs/browser";

export const SendEmail = async ({ email, status, full_name }) => {
  try {
    const statusContent = {
      approved: {
        subject: "Account Approved - Welcome to Barangay Kaypian!",
        message: `Congratulations ${full_name}! Your account has been approved.`,
        description:
          "You now have full access to the Barangay Kaypian portal. Your account is ready to use.",
      },
      rejected: {
        subject: "Account Application Update",
        message: `Hello ${full_name},`,
        description:
          "We regret to inform you that your account application has not been approved at this time. Please contact the barangay office for more details.",
      },
    };

    const content = statusContent[status];

    if (!content) {
      throw new Error(`Invalid status: ${status}`);
    }

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        to_name: full_name,
        subject: content.subject,
        message: content.message,
        description: content.description,
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        privateKey: import.meta.env.VITE_EMAILJS_PRIVATE_KEY, // Note: private key exposed in browser!
      }
    );

    console.log("Email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.log("Email Sending Error:", error);
    return { success: false };
  }
};

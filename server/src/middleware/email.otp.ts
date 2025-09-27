import crypto from "crypto";
import { Otp } from "@/models/otp.model";
import resend from "@/lib/resend";

const SendOtp = async (user: Record<string, string>) => {
  try {
    const { email } = user;
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await Otp.create({ email: email, code: otpCode, expiresAt });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Admin OTP",
      html: `<p>Your OTP is <b>${otpCode}</b>. It expires in 5 minutes.</p>`,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export default SendOtp;

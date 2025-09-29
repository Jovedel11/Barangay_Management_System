import React, { useState } from "react";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/core/components/ui/alert";
import { Badge } from "@/core/components/ui/badge";
import { Separator } from "@/core/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import {
  LogIn,
  Mail,
  Lock,
  Shield,
  AlertCircle,
  CheckCircle,
  KeyRound,
  RefreshCw,
  Eye,
  EyeOff,
  Home,
} from "lucide-react";
import accLogin from "@/services/accLogin";
import sendOtp from "@/services/sendOtp";
import BarangayIllustration from "@/core/components/barangay-illustration";

const Login = () => {
  const {
    login,
    resendEmailConfirmation,
    verifyTwoFactor,
    loading: globalLoading,
  } = {
    login: (email, password) => accLogin(email, password),
    resendEmailConfirmation: () => Promise.resolve({ success: true }),
    verifyTwoFactor: (code) => sendOtp(code),
    loading: false,
  };

  const [show2FADialog, setShow2FADialog] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login action
  async function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return {
        success: false,
        error: "MISSING_CREDENTIALS",
        message: "Please enter both email and password",
        canResendEmail: false,
        nextStep: null,
      };
    }

    const result = await login(email, password);

    if (result.success && result.role === "admin") {
      setShow2FADialog(true);
      return {
        success: false,
        error: null,
        message: "Two-factor authentication required",
        canResendEmail: false,
        nextStep: "two_factor_auth",
        requires2FA: true,
      };
    }

    return {
      success: result.success,
      error: result.error || null,
      message: result.message || null,
      canResendEmail: result.can_resend_email || false,
      nextStep: result.next_step || null,
    };
  }

  const [loginState, loginFormAction, isLoginPending] = useActionState(
    loginAction,
    {
      success: false,
      error: null,
      message: null,
      canResendEmail: false,
      nextStep: null,
      requires2FA: false,
    }
  );

  // 2FA verification
  const handle2FAVerification = async () => {
    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setTwoFactorError("Please enter a valid 6-digit code");
      return;
    }

    setTwoFactorLoading(true);
    setTwoFactorError("");

    try {
      const result = await verifyTwoFactor({
        code: twoFactorCode,
      });

      if (result.success) {
        setShow2FADialog(false);
        setTwoFactorCode("");
        window.alert("Admin is successfully login");
      } else {
        setTwoFactorError(result.message || "Invalid verification code");
      }
    } catch (error) {
      console.log(error);
      setTwoFactorError("Verification failed. Please try again.");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Resend email action
  async function resendEmailAction() {
    const result = await resendEmailConfirmation();
    if (result.success) {
      alert("Verification email sent! Please check your inbox.");
    } else {
      alert("Failed to send email. Please try again.");
    }
  }

  // Error messages
  const getErrorMessage = (error) => {
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

  const getNextStepMessage = (nextStep) => {
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

  const isLoading = isLoginPending || globalLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="min-h-screen flex">
        {/* left Side - Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <BarangayIllustration />
        </div>
        {/* right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/50">
              <CardHeader className="text-center pb-8">
                {/* Header Badge */}
                <Badge
                  variant="secondary"
                  className="mb-6 mx-auto px-4 py-2 bg-primary/10 text-primary border-primary/20"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Barangay Portal Access
                </Badge>

                <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-primary" />
                </div>

                <CardTitle className="text-3xl font-bold text-slate-800 mb-3">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Sign in to access your Barangay Portal and manage your
                  services
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Alert */}
                {loginState.error && (
                  <Alert
                    variant="destructive"
                    className="animate-fadeIn border-red-200 bg-red-50"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="text-base font-semibold">
                      Sign In Failed
                    </AlertTitle>
                    <AlertDescription className="space-y-3 mt-2">
                      <p className="text-sm leading-relaxed">
                        {getErrorMessage(loginState.error)}
                      </p>

                      {loginState.nextStep && !loginState.requires2FA && (
                        <p className="text-sm text-primary font-medium">
                          {getNextStepMessage(loginState.nextStep)}
                        </p>
                      )}

                      {loginState.canResendEmail && (
                        <Button
                          variant="link"
                          onClick={resendEmailAction}
                          disabled={isLoading}
                          className="p-0 h-auto text-primary hover:text-primary/80 text-sm"
                        >
                          Resend verification email
                        </Button>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {loginState.success && (
                  <Alert
                    variant="success"
                    className="animate-fadeIn border-green-200 bg-green-50"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <AlertTitle className="text-base font-semibold">
                      Success!
                    </AlertTitle>
                    <AlertDescription className="text-sm mt-2">
                      Login successful! Redirecting to your dashboard...
                    </AlertDescription>
                  </Alert>
                )}

                {/* Login Form */}
                <form action={loginFormAction} className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="pl-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="pl-11 pr-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-slate-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <LogIn className="w-5 h-5" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>

                <Separator className="my-6" />

                {/* Footer Links */}
                <div className="space-y-4 text-center">
                  <Link
                    to="/forgot-password"
                    className="block text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </Link>

                  <p className="text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 2FA Dialog */}
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-sm border border-white/50">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Two-Factor Authentication
            </DialogTitle>
            <DialogDescription className="text-slate-600 leading-relaxed">
              As an admin user, please enter your 6-digit authentication code to
              complete sign in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* 2FA Error */}
            {twoFactorError && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {twoFactorError}
                </AlertDescription>
              </Alert>
            )}

            {/* 2FA Input */}
            <div className="space-y-3">
              <Label
                htmlFor="twoFactorCode"
                className="text-sm font-semibold text-slate-700"
              >
                Authentication Code
              </Label>
              <Input
                id="twoFactorCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={twoFactorCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setTwoFactorCode(value);
                  setTwoFactorError("");
                }}
                className="text-center text-lg font-mono tracking-widest h-12 border-slate-300 focus:border-primary focus:ring-primary/20"
                maxLength={6}
                disabled={twoFactorLoading}
                autoFocus
              />
              <p className="text-xs text-slate-500 text-center">
                Enter the code from your authenticator app
              </p>
            </div>

            {/* 2FA Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShow2FADialog(false);
                  setTwoFactorCode("");
                  setTwoFactorError("");
                }}
                disabled={twoFactorLoading}
                className="flex-1 border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handle2FAVerification}
                disabled={twoFactorLoading || twoFactorCode.length !== 6}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {twoFactorLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Verify</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;

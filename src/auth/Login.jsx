import React, { useState } from "react";
import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Card } from "@/core/components/ui/card";
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
import { useAuth } from "@/hooks/useAuthProvider";

const Login = () => {
  const { refetch } = useAuth();
  const navigate = useNavigate();
  const {
    login,
    resendEmailConfirmation,
    verifyTwoFactor,
    loading: globalLoading,
  } = {
    login: (email, password) => accLogin(email, password),
    resendEmailConfirmation: (email, password) => accLogin(email, password),
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
    if (!result.success && result.status === "rejected") {
      return {
        success: false,
        error: "REJECTED",
        message: "Your account request has been declined by the administrator.",
        nextStep: null,
      };
    }
    if (!result.success && result.status === "pending") {
      return {
        success: false,
        error: "PENDING",
        message:
          "Your account is pending approval. You’ll be able to access your account once an administrator approves your registration.",
        nextStep: null,
      };
    }
    if (!result.success) {
      return {
        success: false,
        error: "PASSWORD_MISMATCH",
        message: "Incorrect email or password",
        nextStep: null,
      };
    }
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
    refetch();
    return navigate("/resident/dashboard");
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
        refetch();
        navigate("/admin/dashboard");
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
      refetch();
      navigate("/admin/dashboard");
    } else {
      alert("Failed to send email. Please try again.");
    }
  }

  const isLoading = isLoginPending || globalLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
      {/* Main Content Container - Unified Layout */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Single Card Container for Both Components */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left Side - Illustration */}
              <div className="order-2 lg:order-1 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center p-8">
                <BarangayIllustration />
              </div>

              {/* Right Side - Login Form */}
              <div className="order-1 lg:order-2 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <Badge
                      variant="secondary"
                      className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Portal Access
                    </Badge>

                    <div className="mx-auto mb-4 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <LogIn className="w-7 h-7 text-primary" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                      Welcome Back
                    </h1>
                    <p className="text-slate-600 text-sm">
                      Sign in to access your Barangay Portal
                    </p>
                  </div>

                  {/* Error Alert */}
                  {loginState.error && (
                    <Alert
                      variant="destructive"
                      className="mb-6 border-red-200 bg-red-50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="text-sm font-semibold">
                        Sign In Failed
                      </AlertTitle>
                      <AlertDescription className="text-sm mt-1">
                        {loginState.error === "PENDING"
                          ? loginState.message
                          : loginState.error === "REJECTED"
                          ? loginState.message
                          : "Incorrect email or password"}
                        {loginState.nextStep && !loginState.requires2FA && (
                          <p className="text-primary font-medium mt-2">
                            Incorrect email or password
                          </p>
                        )}
                        {loginState.canResendEmail && (
                          <Button
                            variant="link"
                            onClick={resendEmailAction}
                            disabled={isLoading}
                            className="p-0 h-auto text-primary hover:text-primary/80 text-sm mt-2"
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
                      className="mb-6 border-green-200 bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle className="text-sm font-semibold">
                        Success!
                      </AlertTitle>
                      <AlertDescription className="text-sm mt-1">
                        Login successful! Redirecting to your dashboard...
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Login Form */}
                  <form action={loginFormAction} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          className="pl-10 h-10 border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-10 border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
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
                      className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <LogIn className="w-4 h-4" />
                          <span>Sign In</span>
                        </div>
                      )}
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  {/* Footer Links */}
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-slate-600">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 2FA Dialog */}
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-slate-200">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <KeyRound className="w-7 h-7 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Two-Factor Authentication
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Enter your 6-digit authentication code to complete sign in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
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
            <div className="space-y-2">
              <Label
                htmlFor="twoFactorCode"
                className="text-sm font-medium text-slate-700"
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
            <div className="flex gap-3 pt-2">
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

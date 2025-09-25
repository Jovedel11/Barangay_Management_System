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
} from "lucide-react";

const Login = () => {
  // mock context
  const {
    login,
    resendEmailConfirmation,
    verifyTwoFactor,
    loading: globalLoading,
  } = {
    login: () => Promise.resolve({ success: true }),
    resendEmailConfirmation: () => Promise.resolve({ success: true }),
    verifyTwoFactor: () => Promise.resolve({ success: true }),
    loading: false,
  };

  // State for 2FA dialog
  const [show2FADialog, setShow2FADialog] = useState(true);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingLoginData, setPendingLoginData] = useState(null);

  // Login action for useActionState
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

    // Check if user is admin and needs 2FA
    if (result.success && result.user_type === "admin" && result.requires_2fa) {
      setPendingLoginData({ email, sessionToken: result.session_token });
      setShow2FADialog(true);
      return {
        success: false, // Don't complete login yet
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

  // Handle 2FA verification
  const handle2FAVerification = async () => {
    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setTwoFactorError("Please enter a valid 6-digit code");
      return;
    }

    setTwoFactorLoading(true);
    setTwoFactorError("");

    try {
      // This would be your API call to verify 2FA
      const result = await verifyTwoFactor({
        sessionToken: pendingLoginData.sessionToken,
        code: twoFactorCode,
      });

      if (result.success) {
        setShow2FADialog(false);
        setTwoFactorCode("");
        setPendingLoginData(null);
        // Login will be completed by the auth context
      } else {
        setTwoFactorError(result.message || "Invalid verification code");
      }
    } catch (error) {
      console.log(error)
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <Card className="w-full max-w-md glass-effect shadow-2xl border-border relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <LogIn className="w-8 h-8 text-primary" />
          </div>

          <CardTitle className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Sign in to access your Barangay Portal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {loginState.error && (
            <Alert variant="destructive" className="animate-fadeIn">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sign In Failed</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{getErrorMessage(loginState.error)}</p>

                {/* Next step guidance */}
                {loginState.nextStep && !loginState.requires2FA && (
                  <p className="text-sm text-primary font-medium">
                    {getNextStepMessage(loginState.nextStep)}
                  </p>
                )}

                {/* Resend email option */}
                {loginState.canResendEmail && (
                  <Button
                    variant="link"
                    onClick={resendEmailAction}
                    disabled={isLoading}
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    Resend verification email
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {loginState.success && (
            <Alert variant="success" className="animate-fadeIn">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Login successful! Redirecting to your dashboard...
              </AlertDescription>
            </Alert>
          )}

          {/* Login Form */}
          <form action={loginFormAction} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
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

          <Separator />

          {/* Footer Links */}
          <div className="space-y-4 text-center">
            <Link
              to="/forgot-password"
              className="block text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Forgot your password?
            </Link>

            <p className="text-sm text-muted-foreground">
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

      {/* 2FA Dialog */}
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-md glass-effect">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Two-Factor Authentication
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              As an admin user, please enter your 6-digit authentication code to
              complete sign in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 2FA Error */}
            {twoFactorError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{twoFactorError}</AlertDescription>
              </Alert>
            )}

            {/* 2FA Input */}
            <div className="space-y-2">
              <Label
                htmlFor="twoFactorCode"
                className="text-sm font-semibold text-foreground"
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
                className="text-center text-lg font-mono tracking-widest h-12"
                maxLength={6}
                disabled={twoFactorLoading}
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-center">
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
                  setPendingLoginData(null);
                }}
                disabled={twoFactorLoading}
                className="flex-1"
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

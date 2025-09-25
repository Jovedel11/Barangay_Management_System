import React, { useState } from "react";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import signUp  from "@/services/signUp";
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
import { Separator } from "@/core/components/ui/separator";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";

const Signup = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Signup action for useActionState
  async function signupAction(prevState, formData) {
    // Extract form data
    const userData = {
      first_name: formData.get("first_name")?.trim(),
      last_name: formData.get("last_name")?.trim(),
      email: formData.get("email")?.trim(),
      phone_number: formData.get("phone_number")?.trim(),
      password: formData.get("password"),
    };

    const confirmPassword = formData.get("confirmPassword");

    // Client-side validation
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.password
    ) {
      return {
        success: false,
        error: "MISSING_REQUIRED_FIELDS",
        message: "Please fill in all required fields",
        nextStep: null,
      };
    }

    if (userData.password !== confirmPassword) {
      return {
        success: false,
        error: "PASSWORD_MISMATCH",
        message: "Passwords do not match",
        nextStep: null,
      };
    }

    if (userData.password.length < 8) {
      return {
        success: false,
        error: "PASSWORD_TOO_SHORT",
        message: "Password must be at least 8 characters long",
        nextStep: null,
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: "INVALID_EMAIL",
        message: "Please enter a valid email address",
        nextStep: null,
      };
    }

    // Phone validation (optional but if provided, should be valid)
    if (userData.phone_number) {
      const phoneRegex = /^(\+63|0)?[0-9]{10}$/;
      if (!phoneRegex.test(userData.phone_number.replace(/\s/g, ""))) {
        return {
          success: false,
          error: "INVALID_PHONE",
          message: "Please enter a valid Philippine phone number",
          nextStep: null,
        };
      }
    }

    // Call signup service
    const result = await signUp(userData);

    if (result.success) {
      setIsSubmitted(true);
    }

    return {
      success: result.success,
      error: result.error || null,
      message: result.message || null,
      nextStep: result.next_step || null,
    };
  }

  const [signupState, signupFormAction, isSignupPending] = useActionState(
    signupAction,
    {
      success: false,
      error: null,
      message: null,
      nextStep: null,
    }
  );

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "EMAIL_EXISTS":
        return "An account with this email already exists. Please use a different email or try logging in.";
      case "MISSING_REQUIRED_FIELDS":
        return "Please fill in all required fields.";
      case "INVALID_EMAIL":
        return "Please enter a valid email address.";
      case "INVALID_PHONE":
        return "Please enter a valid Philippine phone number (e.g., +63 912 345 6789).";
      case "PASSWORD_MISMATCH":
        return "Passwords do not match.";
      case "PASSWORD_TOO_SHORT":
        return "Password must be at least 8 characters long.";
      case "INTERNAL_ERROR":
        return "An error occurred during registration. Please try again.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  const isLoading = isSignupPending;

  // Success state
  if (isSubmitted && signupState.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-success rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <Card className="w-full max-w-md glass-effect shadow-2xl border-border relative z-10">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-success">
              Registration Successful!
            </h2>

            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Thank you for signing up! Your account has been created and is now
              pending review by our administrators.
            </p>

            <Alert variant="success" className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertTitle>What happens next?</AlertTitle>
              <AlertDescription>
                Our admin team will review your credentials and approve your
                account within 24-48 hours. You'll receive an email notification
                once approved.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/login">Go to Login Page</Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  window.location.reload();
                }}
                className="w-full"
              >
                Register Another Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <Card className="w-full max-w-lg glass-effect shadow-2xl border-border relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>

          <CardTitle className="text-3xl font-bold text-foreground mb-2">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Join the Barangay Portal to access community services
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {signupState.error && (
            <Alert variant="destructive" className="animate-fadeIn">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Registration Failed</AlertTitle>
              <AlertDescription>
                {getErrorMessage(signupState.error)}
              </AlertDescription>
            </Alert>
          )}

          {/* Signup Form */}
          <form action={signupFormAction} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="first_name"
                  className="text-sm font-semibold text-foreground"
                >
                  First Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="First name"
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="last_name"
                  className="text-sm font-semibold text-foreground"
                >
                  Last Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Last name"
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address *
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

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phone_number"
                className="text-sm font-semibold text-foreground"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  placeholder="+63 912 345 6789"
                  className="pl-10 h-12"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Optional - Philippine mobile number format
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground"
                >
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPasswords ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-foreground"
                >
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPasswords ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and include a mix of
              letters, numbers, and symbols.
            </p>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </form>

          <Separator />

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import signUp from "@/services/signUp";
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
  Home,
} from "lucide-react";
import CommunityIllustration from "@/core/components/community-illustration";

const Signup = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Signup action
  async function signupAction(prevState, formData) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: "INVALID_EMAIL",
        message: "Please enter a valid email address",
        nextStep: null,
      };
    }

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

  // Error messages
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
        <div className="min-h-screen flex items-center justify-center">
          {/* Left Side - Success Illustration */}
          <div className="hidden lg:flex flex-1 items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              <CommunityIllustration />
            </div>
          </div>

          {/* Right Side - Success Message */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-white/50">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-success">
                  Registration Successful!
                </h2>

                <p className="text-slate-600 mb-6 text-base leading-relaxed">
                  Thank you for signing up! Your account has been created and is
                  now pending review by our administrators.
                </p>

                <Alert
                  variant="success"
                  className="mb-6 border-green-200 bg-green-50"
                >
                  <Shield className="h-4 w-4" />
                  <AlertTitle className="text-green-800">
                    What happens next?
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Our admin team will review your credentials and approve your
                    account within 24-48 hours. You'll receive an email
                    notification once approved.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 h-12"
                  >
                    <Link to="/login">Go to Login Page</Link>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      window.location.reload();
                    }}
                    className="w-full h-12 border-slate-300 hover:bg-slate-50"
                  >
                    Register Another Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="min-h-screen flex items-center justify-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <CommunityIllustration />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-lg">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/50">
              <CardHeader className="text-center pb-8">
                {/* Header Badge */}
                <Badge
                  variant="secondary"
                  className="mb-6 mx-auto px-4 py-2 bg-primary/10 text-primary border-primary/20"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Join Barangay Portal
                </Badge>

                <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>

                <CardTitle className="text-3xl font-bold text-slate-800 mb-3">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Join the Barangay Portal to access community services and stay
                  connected
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Alert */}
                {signupState.error && (
                  <Alert
                    variant="destructive"
                    className="animate-fadeIn border-red-200 bg-red-50"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="text-base font-semibold">
                      Registration Failed
                    </AlertTitle>
                    <AlertDescription className="text-sm mt-2">
                      {getErrorMessage(signupState.error)}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Signup Form */}
                <form action={signupFormAction} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label
                        htmlFor="first_name"
                        className="text-sm font-semibold text-slate-700"
                      >
                        First Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="text"
                          id="first_name"
                          name="first_name"
                          placeholder="First name"
                          className="pl-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="last_name"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Last Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="text"
                          id="last_name"
                          name="last_name"
                          placeholder="Last name"
                          className="pl-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email Address *
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

                  {/* Phone Number */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone_number"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        placeholder="+63 912 345 6789"
                        className="pl-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Optional - Philippine mobile number format
                    </p>
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type={showPasswords ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Create a strong password"
                          className="pl-11 pr-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          minLength={8}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? (
                            <EyeOff className="w-4 h-4 text-slate-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type={showPasswords ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          className="pl-11 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Password must be at least 8 characters long and include a
                    mix of letters, numbers, and symbols.
                  </p>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                      </div>
                    )}
                  </Button>
                </form>

                <Separator className="my-6" />

                {/* Footer Links */}
                <div className="text-center">
                  <p className="text-sm text-slate-600">
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
        </div>
      </div>
    </div>
  );
};

export default Signup;

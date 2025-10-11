import React, { useState, useRef } from "react";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import signUp from "@/services/signUp";
import { Card } from "@/core/components/ui/card";
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
  Check,
  X,
} from "lucide-react";
import CommunityIllustration from "@/core/components/community-illustration";
import { getErrorMessage } from "@/core/utils/signup-message";

const Signup = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const formRef = useRef(null);

  // Real-time validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^(\+63|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // Handle input changes and real-time validation
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear previous error for this field
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }

    // real-time validation
    let error = null;
    switch (field) {
      case "email":
        if (value && !validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone_number":
        if (value && !validatePhone(value)) {
          error = "Please enter a valid Philippine phone number";
        }
        break;
      case "password":
        if (value && !validatePassword(value)) {
          error = "Password must be at least 8 characters long";
        }
        // check if password exists
        if (
          formData.confirmPassword &&
          !validatePasswordMatch(value, formData.confirmPassword)
        ) {
          setFieldErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else if (formData.confirmPassword) {
          setFieldErrors((prev) => ({ ...prev, confirmPassword: null }));
        }
        break;
      case "confirmPassword":
        if (value && !validatePasswordMatch(formData.password, value)) {
          error = "Passwords do not match";
        }
        break;
    }

    if (error) {
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

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

    // reset field errors
    setFieldErrors({});

    const errors = {};

    if (!userData.first_name) {
      errors.first_name = "First name is required";
    }
    if (!userData.last_name) {
      errors.last_name = "Last name is required";
    }
    if (!userData.email) {
      errors.email = "Email address is required";
    } else if (!validateEmail(userData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(userData.password)) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (!validatePasswordMatch(userData.password, confirmPassword)) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (userData.phone_number && !validatePhone(userData.phone_number)) {
      errors.phone_number = "Please enter a valid Philippine phone number";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return {
        success: false,
        error: "VALIDATION_ERROR",
        message: "Please correct the errors below",
        nextStep: null,
      };
    }

    const result = await signUp(userData);

    if (result.success) {
      setIsSubmitted(true);
      // this will clear only when success
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
      });
      setFieldErrors({});
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

  const isLoading = isSignupPending;

  // validation status for input fields
  const getFieldStatus = (field) => {
    const value = formData[field];
    const hasError = fieldErrors[field];

    if (!value) return null;
    if (hasError) return "error";

    // show success for valid fields
    switch (field) {
      case "email":
        return validateEmail(value) ? "success" : null;
      case "phone_number":
        return value ? (validatePhone(value) ? "success" : null) : null;
      case "password":
        return validatePassword(value) ? "success" : null;
      case "confirmPassword":
        return value && validatePasswordMatch(formData.password, value)
          ? "success"
          : null;
      default:
        return value.trim() ? "success" : null;
    }
  };

  // Success state
  if (isSubmitted && signupState.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                <div className="order-2 lg:order-1 bg-gradient-to-br from-success/5 to-primary/10 flex items-center justify-center p-8">
                  <CommunityIllustration />
                </div>
                <div className="order-1 lg:order-2 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm text-center">
                    <div className="mx-auto mb-6 w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-success">
                      Registration Successful!
                    </h2>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                      Thank you for signing up! Your account has been created
                      and is now pending review by our administrators.
                    </p>
                    <Alert
                      variant="success"
                      className="mb-6 border-green-200 bg-green-50 text-left"
                    >
                      <Shield className="h-4 w-4" />
                      <AlertTitle className="text-green-800 text-sm">
                        What happens next?
                      </AlertTitle>
                      <AlertDescription className="text-green-700 text-sm">
                        Our admin team will review your credentials and approve
                        your account within 24-48 hours. You'll receive an email
                        notification once approved.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 h-10"
                      >
                        <Link to="/login">Go to Login Page</Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          window.location.reload();
                        }}
                        className="w-full h-10 border-slate-300 hover:bg-slate-50"
                      >
                        Register Another Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[700px]">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-success/5 to-primary/10 flex items-center justify-center p-8">
                <CommunityIllustration />
              </div>

              <div className="order-1 lg:order-2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <Badge
                      variant="secondary"
                      className="mb-4 px-3 py-1 bg-success/10 text-success border-success/20"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Join Community
                    </Badge>

                    <div className="mx-auto mb-4 w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center">
                      <UserPlus className="w-7 h-7 text-success" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                      Create Your Account
                    </h1>
                    <p className="text-slate-600 text-sm">
                      Join the Barangay Portal to access community services
                    </p>
                  </div>

                  {/* Error Alert - Only show non-validation errors */}
                  {signupState.error &&
                    signupState.error !== "VALIDATION_ERROR" && (
                      <Alert
                        variant="destructive"
                        className="mb-4 border-red-200 bg-red-50"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm font-semibold">
                          Registration Failed
                        </AlertTitle>
                        <AlertDescription className="text-sm mt-1">
                          {getErrorMessage(signupState.error)}
                        </AlertDescription>
                      </Alert>
                    )}

                  {/* Signup Form */}
                  <form
                    ref={formRef}
                    action={signupFormAction}
                    className="space-y-4"
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="first_name"
                          className="text-sm font-medium text-slate-700"
                        >
                          First Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={(e) =>
                              handleInputChange("first_name", e.target.value)
                            }
                            placeholder="First name"
                            className={`pl-10 pr-10 h-10 transition-colors ${
                              fieldErrors.first_name
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : getFieldStatus("first_name") === "success"
                                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                                : "border-slate-300 focus:border-success focus:ring-success/20"
                            }`}
                            required
                            disabled={isLoading}
                          />
                          {getFieldStatus("first_name") === "success" && (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                          )}
                          {fieldErrors.first_name && (
                            <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                          )}
                        </div>
                        {fieldErrors.first_name && (
                          <p className="text-xs text-red-600">
                            {fieldErrors.first_name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="last_name"
                          className="text-sm font-medium text-slate-700"
                        >
                          Last Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={(e) =>
                              handleInputChange("last_name", e.target.value)
                            }
                            placeholder="Last name"
                            className={`pl-10 pr-10 h-10 transition-colors ${
                              fieldErrors.last_name
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : getFieldStatus("last_name") === "success"
                                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                                : "border-slate-300 focus:border-success focus:ring-success/20"
                            }`}
                            required
                            disabled={isLoading}
                          />
                          {getFieldStatus("last_name") === "success" && (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                          )}
                          {fieldErrors.last_name && (
                            <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                          )}
                        </div>
                        {fieldErrors.last_name && (
                          <p className="text-xs text-red-600">
                            {fieldErrors.last_name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter your email"
                          className={`pl-10 pr-10 h-10 transition-colors ${
                            fieldErrors.email
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : getFieldStatus("email") === "success"
                              ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                              : "border-slate-300 focus:border-success focus:ring-success/20"
                          }`}
                          required
                          disabled={isLoading}
                        />
                        {getFieldStatus("email") === "success" && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                        {fieldErrors.email && (
                          <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                        )}
                      </div>
                      {fieldErrors.email && (
                        <p className="text-xs text-red-600">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone_number"
                        className="text-sm font-medium text-slate-700"
                      >
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="tel"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={(e) =>
                            handleInputChange("phone_number", e.target.value)
                          }
                          placeholder="+63 912 345 6789"
                          className={`pl-10 pr-10 h-10 transition-colors ${
                            fieldErrors.phone_number
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : getFieldStatus("phone_number") === "success"
                              ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                              : "border-slate-300 focus:border-success focus:ring-success/20"
                          }`}
                          disabled={isLoading}
                        />
                        {getFieldStatus("phone_number") === "success" && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                        {fieldErrors.phone_number && (
                          <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                        )}
                      </div>
                      {fieldErrors.phone_number ? (
                        <p className="text-xs text-red-600">
                          {fieldErrors.phone_number}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">
                          Optional - Philippine mobile number
                        </p>
                      )}
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-slate-700"
                        >
                          Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type={showPasswords ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            placeholder="Create password"
                            className={`pl-10 pr-16 h-10 transition-colors ${
                              fieldErrors.password
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : getFieldStatus("password") === "success"
                                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                                : "border-slate-300 focus:border-success focus:ring-success/20"
                            }`}
                            required
                            minLength={8}
                            disabled={isLoading}
                          />
                          {getFieldStatus("password") === "success" && (
                            <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                          )}
                          {fieldErrors.password && (
                            <X className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            {showPasswords ? (
                              <EyeOff className="w-4 h-4 text-slate-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-slate-500" />
                            )}
                          </Button>
                        </div>
                        {fieldErrors.password && (
                          <p className="text-xs text-red-600">
                            {fieldErrors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-slate-700"
                        >
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type={showPasswords ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            placeholder="Confirm password"
                            className={`pl-10 pr-10 h-10 transition-colors ${
                              fieldErrors.confirmPassword
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : getFieldStatus("confirmPassword") ===
                                  "success"
                                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                                : "border-slate-300 focus:border-success focus:ring-success/20"
                            }`}
                            required
                            disabled={isLoading}
                          />
                          {getFieldStatus("confirmPassword") === "success" && (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                          )}
                          {fieldErrors.confirmPassword && (
                            <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                          )}
                        </div>
                        {fieldErrors.confirmPassword && (
                          <p className="text-xs text-red-600">
                            {fieldErrors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Password must be at least 8 characters long
                    </p>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-10 bg-success hover:bg-success/90 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
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

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-slate-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-success hover:text-success/80 font-medium transition-colors"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;

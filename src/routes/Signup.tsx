import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const SignupPage: React.FC = () => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ api: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const passwordStrength = () => {
    if (formData.password.length === 0) return 0;
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    switch (strength) {
      case 0:
        return "bg-gray-200";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    switch (strength) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center">
            <Scale className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`appearance-none relative block w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className={`appearance-none relative block w-full pl-10 pr-10 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Password Strength */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Password strength:</p>
                <p
                  className={`text-xs font-medium ${
                    passwordStrength() <= 1
                      ? "text-red-500"
                      : passwordStrength() === 2
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {getStrengthText()}
                </p>
              </div>
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full">
                <div
                  className={`h-1 rounded-full ${getStrengthColor()}`}
                  style={{ width: `${(passwordStrength() / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Agree to terms */}
          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                terms and conditions
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
          )}

          {errors.api && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {errors.api}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

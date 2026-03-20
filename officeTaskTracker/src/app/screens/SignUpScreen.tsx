import { useState } from "react";
import { useNavigate } from "react-router";
import { WireframeButton, SectionDivider } from "../components/WireframeBox";
import { User, Mail, Lock, CheckSquare, AlertCircle } from "lucide-react";

export function SignUpScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors: Record<string, string> = {};
  if (submitted) {
    if (!username.trim()) errors.username = "Username is required.";
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password && confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!agreed) errors.terms = "You must accept the Terms & Privacy Policy.";
  }

  const hasErrors = submitted && Object.keys(errors).length > 0;

  const handleSubmit = () => {
    setSubmitted(true);
    const errs: Record<string, string> = {};
    if (!username.trim()) errs.username = "x";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "x";
    if (!password || password.length < 8) errs.password = "x";
    if (!confirmPassword || confirmPassword !== password) errs.confirmPassword = "x";
    if (!agreed) errs.terms = "x";
    if (Object.keys(errs).length === 0) navigate("/home");
  };

  const fieldClass = (key: string) =>
    `border-2 rounded-xl px-4 py-3 flex items-center gap-3 ${
      submitted && errors[key]
        ? "border-red-400 bg-red-50"
        : "border-gray-300 bg-gray-50"
    }`;

  return (
    <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-5 mt-2">
        <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-3 shadow-lg">
          <CheckSquare size={28} color="white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
        <p className="text-xs text-gray-500 mt-1">Join officeTaskTracker today</p>
      </div>

      {/* Global error banner */}
      {hasErrors && (
        <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-300 rounded-xl px-3 py-2.5">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-red-600 font-medium">
            Please fix the errors below before continuing.
          </p>
        </div>
      )}

      {/* Form */}
      <div className="flex flex-col gap-3">
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Username
          </label>
          <div className={fieldClass("username")}>
            <User size={14} className={submitted && errors.username ? "text-red-400 flex-shrink-0" : "text-gray-400 flex-shrink-0"} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. john_doe"
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
          {submitted && errors.username && (
            <p className="text-[10px] text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Email Address
          </label>
          <div className={fieldClass("email")}>
            <Mail size={14} className={submitted && errors.email ? "text-red-400 flex-shrink-0" : "text-gray-400 flex-shrink-0"} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
          {submitted && errors.email && (
            <p className="text-[10px] text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Password
          </label>
          <div className={fieldClass("password")}>
            <Lock size={14} className={submitted && errors.password ? "text-red-400 flex-shrink-0" : "text-gray-400 flex-shrink-0"} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
          {submitted && errors.password && (
            <p className="text-[10px] text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Confirm Password
          </label>
          <div className={fieldClass("confirmPassword")}>
            <Lock size={14} className={submitted && errors.confirmPassword ? "text-red-400 flex-shrink-0" : "text-gray-400 flex-shrink-0"} />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
          {submitted && errors.confirmPassword && (
            <p className="text-[10px] text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                agreed
                  ? "bg-gray-900 border-gray-900"
                  : submitted && errors.terms
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {agreed && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500">
              I agree to the <span className="underline text-gray-700 cursor-pointer">Terms</span> &{" "}
              <span className="underline text-gray-700 cursor-pointer">Privacy Policy</span>
            </span>
          </div>
          {submitted && errors.terms && (
            <p className="text-[10px] text-red-500 flex items-center gap-1 ml-6">
              <AlertCircle size={10} /> {errors.terms}
            </p>
          )}
        </div>

        <WireframeButton label="Create Account" variant="primary" onClick={handleSubmit} />

        <SectionDivider label="OR" />

        <div className="border-2 border-dashed border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 bg-gray-50">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-400 font-medium">Sign up with Google</span>
        </div>
      </div>

      {/* Login Link */}
      <div className="mt-auto pt-4 flex items-center justify-center gap-1">
        <span className="text-xs text-gray-500">Already have an account?</span>
        <button
          onClick={() => navigate("/login")}
          className="text-xs font-bold text-gray-900 underline"
        >
          Log In
        </button>
      </div>

      {/* Annotation */}
      <div className="mt-3 border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
        <p className="text-[10px] text-blue-500 text-center font-medium">
          ② Sign Up Screen — Registration Form
        </p>
      </div>
    </div>
  );
}

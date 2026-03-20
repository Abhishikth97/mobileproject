import { useNavigate } from "react-router";
import { WireframeButton, SectionDivider } from "../components/WireframeBox";
import { User, Mail, Lock, CheckSquare } from "lucide-react";

export function SignUpScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-6 mt-2">
        <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-3 shadow-lg">
          <CheckSquare size={28} color="white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
        <p className="text-xs text-gray-500 mt-1">Join officeTaskTracker today</p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-3.5">
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Username
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <User size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Email Address
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <Mail size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Password
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <Lock size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Confirm Password
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <Lock size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 rounded bg-gray-50 flex-shrink-0" />
          <span className="text-xs text-gray-500">
            I agree to the <span className="underline text-gray-700">Terms</span> &{" "}
            <span className="underline text-gray-700">Privacy Policy</span>
          </span>
        </div>

        <WireframeButton label="Create Account" variant="primary" onClick={() => navigate("/home")} />

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
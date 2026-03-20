import { useNavigate } from "react-router";
import { WireframeInput, WireframeButton, SectionDivider } from "../components/WireframeBox";
import { Lock, Mail, CheckSquare } from "lucide-react";

export function LoginScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8 mt-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-3 shadow-lg">
          <CheckSquare size={32} color="white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">officeTaskTracker</h1>
        <p className="text-xs text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
            <Mail size={10} /> Email Address
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <Mail size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
            <Lock size={10} /> Password
          </label>
          <div className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 flex items-center gap-3">
            <Lock size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-3 bg-gray-200 rounded-full" />
            <div className="w-4 h-3 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex justify-end">
          <span className="text-xs text-gray-400 underline">Forgot password?</span>
        </div>

        <WireframeButton label="Login" variant="primary" onClick={() => navigate("/home")} />

        <SectionDivider label="OR" />

        {/* Social Login Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 bg-gray-50">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-400 font-medium">Continue with Google</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="mt-auto pt-6 flex items-center justify-center gap-1">
        <span className="text-xs text-gray-500">Don't have an account?</span>
        <button
          onClick={() => navigate("/signup")}
          className="text-xs font-bold text-gray-900 underline"
        >
          Sign Up
        </button>
      </div>

      {/* Annotation */}
      <div className="mt-4 border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
        <p className="text-[10px] text-blue-500 text-center font-medium">
          ① Login Screen — Email + Password Auth
        </p>
      </div>
    </div>
  );
}
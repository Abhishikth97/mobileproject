import React from "react";

interface WireframeBoxProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  height?: number | string;
}

export function WireframeBox({ className = "", children, label, height }: WireframeBoxProps) {
  return (
    <div
      className={`border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg flex items-center justify-center ${className}`}
      style={height ? { height } : undefined}
    >
      {children || (
        <span className="text-gray-400 text-xs font-medium">{label}</span>
      )}
    </div>
  );
}

export function WireframeInput({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="border-2 border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 flex items-center gap-2">
        <div className="w-full h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function WireframeButton({
  label,
  variant = "primary",
  onClick,
  icon,
}: {
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  const styles = {
    primary: "bg-gray-900 text-white border-gray-900",
    secondary: "bg-white text-gray-700 border-gray-300",
    ghost: "bg-transparent text-gray-500 border-transparent",
    danger: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all active:scale-95 ${styles[variant]}`}
    >
      {icon}
      {label}
    </button>
  );
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-gray-200" />
      {label && <span className="text-xs text-gray-400 font-medium">{label}</span>}
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export function WireframeAvatar({ size = 48 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-gray-400" style={{ fontSize: size * 0.35 }}>👤</span>
    </div>
  );
}

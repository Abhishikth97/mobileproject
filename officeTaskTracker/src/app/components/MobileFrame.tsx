import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
        style={{ width: 375, height: 812, border: "10px solid #1a1a1a", boxSizing: "border-box" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#1a1a1a] rounded-b-2xl z-20" />

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-white z-10 flex-shrink-0" style={{ paddingTop: "12px" }}>
          <span className="text-xs font-semibold text-gray-800">9:41</span>
          <div className="flex items-center gap-1 text-gray-800">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

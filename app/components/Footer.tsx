import React from "react";
import { Scale } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold">Everyday Legal Buddy</span>
          </div>

          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 max-w-2xl">
            <p className="text-yellow-800 text-sm font-medium">
              ⚠️ <strong>Important Disclaimer:</strong> We are not a law firm.
              This tool provides AI-powered summaries and analysis for
              educational purposes only, not legal advice. Always consult with a
              qualified attorney for legal matters.
            </p>
          </div>

          <div className="text-slate-400 text-sm">
            <p>&copy; 2024 Everyday Legal Buddy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import { FileText, AlertTriangle, Shield, Edit } from "lucide-react";
import type { ContractSummary } from "../data/dummyData";
import { Button } from "./ui/Button";

interface SummaryCardProps {
  summary: ContractSummary;
  onViewDetails?: () => void;
  showActions?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  summary,
  onViewDetails,
  showActions = true,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            {summary.title}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-green-600" />
            <h3 className="font-medium text-slate-800">Your Rights</h3>
          </div>
          <ul className="space-y-2">
            {summary.rights.slice(0, 3).map((right, index) => (
              <li
                key={index}
                className="text-sm text-slate-600 flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                {right}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="font-medium text-slate-800">Key Risks</h3>
          </div>
          <ul className="space-y-2">
            {summary.risks.slice(0, 3).map((risk) => (
              <li
                key={risk.id}
                className="text-sm text-slate-600 flex items-start gap-2"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${risk.severity === "high"
                      ? "bg-red-500"
                      : risk.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                ></span>
                {risk.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Edit className="w-4 h-4 text-blue-600" />
          <h3 className="font-medium text-slate-800">Suggested Improvements</h3>
        </div>
        <ul className="space-y-2">
          {summary.suggestedEdits.slice(0, 2).map((edit, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 flex items-start gap-2"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              {edit}
            </li>
          ))}
        </ul>
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <Button onClick={onViewDetails} className="flex-1">
            View Full Analysis
          </Button>
          <Button variant="outline" className="flex-1">
            Download Summary
          </Button>
        </div>
      )}
    </div>
  );
};

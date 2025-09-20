import React from "react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { Risk } from "../data/dummyData";

interface RiskAlertProps {
  risk: Risk;
}

export const RiskAlert: React.FC<RiskAlertProps> = ({ risk }) => {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      iconColor: "text-red-700",
      textColor: "text-red-900 font-bold",
    },
    high: {
      icon: AlertTriangle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      textColor: "text-red-800",
    },
    medium: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-800",
    },
    low: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
    },
  };

  const config = severityConfig[risk.severity];
  const Icon = config.icon;

  return (
    <div
      className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-medium ${config.textColor} mb-1`}>
            {risk.title}
          </h4>
          <p className={`text-sm ${config.textColor} opacity-90`}>
            {risk.description}
          </p>
        </div>
      </div>
    </div>
  );
};

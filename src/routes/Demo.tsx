import React from "react";
import { Link } from "react-router-dom";
import { SummaryCard } from "../components/SummaryCard";
import { RiskAlert } from "../components/RiskAlert";
import { Button } from "../components/ui/Button";
import { demoContract } from "../data/dummyData";
import { Upload, Shield, AlertTriangle, Edit, FileText } from "lucide-react";

export const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Demo: Contract Analysis
          </h1>
          <p className="text-lg text-slate-600">
            See how Everyday Legal Buddy analyzes a real software license
            agreement
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SummaryCard summary={demoContract} showActions={false} />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    Your Rights
                  </h2>
                </div>
                <ul className="space-y-3">
                  {demoContract.rights.map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{right}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    Your Obligations
                  </h2>
                </div>
                <ul className="space-y-3">
                  {demoContract.keyObligations.map((obligation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{obligation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Risks & Red Flags
                </h2>
              </div>
              <div className="space-y-4">
                {demoContract.risks.map((risk) => (
                  <RiskAlert key={risk.id} risk={risk} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Edit className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Suggested Edits
                </h2>
              </div>
              <ul className="space-y-3">
                {demoContract.suggestedEdits.map((edit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700">{edit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Try It Yourself
              </h3>
              <p className="text-slate-600 mb-4">
                Ready to analyze your own contracts? Upload any legal document
                and get instant insights.
              </p>
              <Link to="/upload">
                <Button icon={Upload} className="w-full">
                  Upload Your Contract
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-700 text-sm">
                This demo shows a free analysis. Pro users get even more
                detailed breakdowns, clause-by-clause analysis, and industry
                comparisons.
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6">
              <h4 className="font-semibold text-slate-800 mb-2">
                Contract Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Document Type:</span>
                  <span className="font-medium">Software License</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Risk Level:</span>
                  <span className="font-medium text-red-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Page Count:</span>
                  <span className="font-medium">12 pages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Analysis Time:</span>
                  <span className="font-medium">45 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

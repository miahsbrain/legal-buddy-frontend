import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Edit,
  FileText,
  Download,
  CreditCard,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { RiskAlert } from "../components/RiskAlert";
import { Modal } from "../components/ui/Modal";
import {
  type Contract,
  type ContractSummary,
  ContractsAPI,
} from "../api/contractsApi";

export const SummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    ContractsAPI.getContract(id)
      .then((res) => setContract(res.data))
      .catch((err) => {
        console.error("Failed to load contract", err);
        setError("Could not load contract details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading contract summary…</p>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              {error || "Contract Not Found"}
            </h1>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const summary: ContractSummary | undefined = contract.summary;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Contract Analysis
              </h1>
              <p className="text-slate-600">{summary?.title || "Untitled"}</p>
            </div>

            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button variant="outline" icon={Download} size="sm">
                Export PDF
              </Button>
              {contract.status === "summarized" && (
                <Button
                  icon={CreditCard}
                  size="sm"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Rights */}
            {summary?.rights && summary.rights.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Your Rights
                  </h2>
                </div>
                <ul className="space-y-3">
                  {summary.rights.map((right, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{right}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Obligations */}
            {summary?.keyObligations && summary.keyObligations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Your Obligations
                  </h2>
                </div>
                <ul className="space-y-3">
                  {summary.keyObligations.map((o, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risks */}
            {summary?.risks && summary.risks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Risks & Red Flags
                  </h2>
                </div>
                <div className="space-y-4">
                  {summary.risks.map((risk) => (
                    <RiskAlert key={risk.id} risk={risk} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Edits */}
            {summary?.suggestedEdits && summary.suggestedEdits.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Suggested Edits
                  </h2>
                </div>
                <ul className="space-y-3">
                  {summary.suggestedEdits.map((edit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{edit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Contract Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Upload Date:</span>
                  <span className="font-medium">
                    {new Date(contract.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Analysis Type:</span>
                  <span className="font-medium">
                    {contract.status === "detailed"
                      ? "Pro Analysis"
                      : "Basic Summary"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Risk Count:</span>
                  <span className="font-medium text-red-600">
                    {summary?.risks?.length ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Obligations:</span>
                  <span className="font-medium">
                    {summary?.keyObligations?.length ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {contract.status === "summarized" && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🚀 Upgrade to Pro
                </h4>
                <p className="text-blue-700 text-sm mb-4">
                  Get detailed clause analysis, severity ratings, and industry
                  comparisons for just $8.
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade Now
                </Button>
              </div>
            )}

            <div className="bg-slate-100 rounded-2xl p-6">
              <h4 className="font-semibold text-slate-800 mb-3">Need Help?</h4>
              <p className="text-slate-600 text-sm mb-4">
                Have questions about your contract analysis? Our support team is
                here to help.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          title="Upgrade to Pro Analysis"
        >
          <div className="space-y-4">
            <p className="text-slate-700">
              Unlock detailed analysis for this contract with Pro features:
            </p>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-2">
                Pro Analysis includes:
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Clause-by-clause risk ratings</li>
                <li>• Industry benchmark comparisons</li>
                <li>• Specific negotiation strategies</li>
                <li>• Detailed legal precedent analysis</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Pay $8 & Upgrade</Button>
              <Button
                variant="outline"
                onClick={() => setShowUpgradeModal(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SummaryPage;

import React, { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import { SummaryCard } from "../components/SummaryCard";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { demoContract } from "../data/dummyData";
import { CreditCard, Download } from "lucide-react";

export const UploadPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setShowSummary(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Upload Your Contract
          </h1>
          <p className="text-lg text-slate-600">
            Get instant AI-powered analysis in plain language
          </p>
        </div>

        {!showSummary ? (
          <div className="max-w-2xl mx-auto">
            {isProcessing ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <Loader size="lg" text="Analyzing your contract..." />
                <p className="text-slate-600 mt-4">
                  This usually takes 30-60 seconds
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8">
                <FileUploader onFileUpload={handleFileUpload} />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                ✅ Contract analyzed successfully! Here's your summary:
              </p>
            </div>

            <SummaryCard summary={demoContract} showActions={false} />

            <div className="grid md:grid-cols-2 gap-4">
              <Button icon={Download} variant="outline" className="w-full">
                Download Summary (Free)
              </Button>
              <Button
                icon={CreditCard}
                className="w-full"
                onClick={handleUpgrade}
              >
                Get Detailed Assessment ($8)
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Upgrade to Pro</strong> for detailed risk analysis,
                suggested contract edits, and priority support.
              </p>
            </div>
          </div>
        )}

        <Modal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          title="Upgrade to Pro Analysis"
        >
          <div className="space-y-4">
            <p className="text-slate-700">
              Get detailed risk analysis and actionable suggestions for just $8.
            </p>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-2">
                Pro Analysis includes:
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Detailed risk severity ratings</li>
                <li>• Clause-by-clause analysis</li>
                <li>• Specific suggested edits</li>
                <li>• Comparison with industry standards</li>
                <li>• Priority email support</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Pay $8 & Analyze</Button>
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

export default UploadPage;

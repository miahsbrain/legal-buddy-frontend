import React from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { userContracts } from "../data/dummyData";

export const DashboardPage: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "summarized":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "detailed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "summarized":
        return "Basic Analysis Complete";
      case "detailed":
        return "Pro Analysis Complete";
      case "pending":
        return "Processing...";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "summarized":
        return "text-green-600 bg-green-50";
      case "detailed":
        return "text-blue-600 bg-blue-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Your Contracts
            </h1>
            <p className="text-slate-600 mt-1">
              Manage and review your uploaded contracts
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/upload">
              <Button icon={Plus}>Upload New Contract</Button>
            </Link>
          </div>
        </div>

        {userContracts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              No contracts yet
            </h2>
            <p className="text-slate-600 mb-6">
              Upload your first contract to get started with AI-powered analysis
            </p>
            <Link to="/upload">
              <Button icon={Plus}>Upload Your First Contract</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {userContracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {contract.title}
                      </h3>

                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-slate-600">
                          Uploaded on{" "}
                          {new Date(contract.uploadDate).toLocaleDateString()}
                        </span>

                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(contract.status)}`}
                        >
                          {getStatusIcon(contract.status)}
                          {getStatusText(contract.status)}
                        </div>
                      </div>

                      {contract.summary && (
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Rights:</span>
                            <span className="ml-1 font-medium">
                              {contract.summary.rights.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Obligations:</span>
                            <span className="ml-1 font-medium">
                              {contract.summary.keyObligations.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Risks:</span>
                            <span className="ml-1 font-medium">
                              {contract.summary.risks.length}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 ml-4">
                    {contract.status !== "pending" && (
                      <Link to={`/summary/${contract.id}`}>
                        <Button size="sm">View Analysis</Button>
                      </Link>
                    )}

                    {contract.status === "summarized" && (
                      <Button variant="outline" size="sm">
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">
                Need help with contract analysis?
              </h3>
              <p className="text-blue-700 text-sm mb-3">
                Try our demo to see how AI can help you understand complex legal
                documents.
              </p>
              <Link to="/demo">
                <Button variant="outline" size="sm">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

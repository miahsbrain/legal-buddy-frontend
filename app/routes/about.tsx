import React from "react";
import { Scale, Shield, Users, Lightbulb, AlertTriangle } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            About Everyday Legal Buddy
          </h1>
          <p className="text-xl text-slate-600">
            Making legal documents accessible to everyone
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Our Mission
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Legal documents don't have to be intimidating. At Everyday Legal
            Buddy, we believe everyone should be able to understand the
            contracts they sign. Our AI-powered platform transforms complex
            legal language into clear, actionable insights that help you make
            informed decisions.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            Whether you're a small business owner reviewing a vendor agreement,
            a freelancer checking a client contract, or an individual navigating
            a rental lease, we're here to help you understand what you're
            signing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                How It Works
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Upload your contract, and our advanced AI analyzes every clause to
              identify:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Your rights and protections
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Your obligations and responsibilities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Potential risks and red flags
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Suggested improvements and edits
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Privacy & Security
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Your privacy is our priority. We protect your sensitive documents
              with:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                End-to-end encryption
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Automatic file deletion after 24 hours
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                SOC 2 compliant infrastructure
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                No data sharing with third parties
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Users className="w-6 h-6 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Who We Help</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">
                Small Businesses
              </h4>
              <p className="text-slate-600 text-sm">
                Review vendor agreements, service contracts, and partnership
                deals with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Freelancers</h4>
              <p className="text-slate-600 text-sm">
                Understand client contracts, protect your intellectual property,
                and negotiate better terms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Individuals</h4>
              <p className="text-slate-600 text-sm">
                Navigate rental agreements, employment contracts, and consumer
                agreements safely.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Important Legal Disclaimer
              </h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                <strong>We are not a law firm.</strong> Everyday Legal Buddy
                provides AI-powered contract analysis and educational
                information only. Our service does not constitute legal advice,
                and we do not create attorney-client relationships. For specific
                legal questions or complex matters, always consult with a
                qualified attorney licensed in your jurisdiction. While we
                strive for accuracy, our AI analysis should not be your sole
                basis for making legal decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

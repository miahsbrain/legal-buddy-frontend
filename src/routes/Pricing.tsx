import React, { useState } from "react";
import { PricingCard } from "../components/PricingCard";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";

export const PricingPage: React.FC = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for occasional contract reviews",
      features: [
        "Upload and analyze contracts",
        "Basic contract summaries",
        "Key obligations identification",
        "Basic risk alerts",
        "Download summary reports",
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$8",
      period: "per contract",
      description: "Comprehensive analysis for important contracts",
      features: [
        "Everything in Free",
        "Detailed risk severity analysis",
        "Clause-by-clause breakdown",
        "Specific suggested edits",
        "Industry standard comparisons",
        "Priority email support",
        "Advanced contract insights",
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "primary" as const,
    },
  ];

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    if (tierName === "Pro") {
      setShowCheckoutModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Start free, upgrade when you need detailed analysis
          </p>
          <p className="text-slate-500">
            No monthly subscriptions. Pay only for the contracts you analyze.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              onSelect={() => handleTierSelect(tier.name)}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  What file formats do you support?
                </h3>
                <p className="text-slate-600 text-sm">
                  We currently support PDF and DOCX files up to 10MB in size.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  How accurate is the analysis?
                </h3>
                <p className="text-slate-600 text-sm">
                  Our AI achieves 95%+ accuracy in identifying key contract
                  elements, but remember this is for educational purposes, not
                  legal advice.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Is my data secure?
                </h3>
                <p className="text-slate-600 text-sm">
                  Yes! We use enterprise-grade encryption and never store your
                  contracts permanently. Files are deleted after 24 hours.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  What's the difference between Free and Pro?
                </h3>
                <p className="text-slate-600 text-sm">
                  Free gives you basic summaries. Pro provides detailed risk
                  analysis, specific edit suggestions, and industry comparisons.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Can I get a refund?
                </h3>
                <p className="text-slate-600 text-sm">
                  Yes! If you're not satisfied with your Pro analysis, we offer
                  a full refund within 24 hours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Do you offer bulk pricing?
                </h3>
                <p className="text-slate-600 text-sm">
                  For businesses analyzing 20+ contracts monthly, contact us for
                  custom enterprise pricing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          title="Upgrade to Pro Analysis"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">$8</h3>
              <p className="text-slate-600">
                One-time payment for detailed analysis
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">
                What you'll get:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Detailed risk severity ratings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Clause-by-clause analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Specific suggested edits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Industry standard comparisons
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Priority support
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Pay $8 & Analyze Contract
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCheckoutModal(false)}
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Secure payment powered by Stripe. 24-hour money-back guarantee.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PricingPage;

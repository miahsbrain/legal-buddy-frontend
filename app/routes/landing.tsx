import React from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Eye,
  CheckCircle,
  AlertTriangle,
  Edit,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Simple Summaries",
      description: "Get plain-language explanations of complex legal documents",
    },
    {
      icon: AlertTriangle,
      title: "Red Flag Alerts",
      description: "Identify potentially problematic clauses and hidden risks",
    },
    {
      icon: Edit,
      title: "Suggested Edits",
      description:
        "Receive actionable recommendations for contract improvements",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Everyday Legal Buddy
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Understand contracts in plain language.
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Upload any legal document and get instant AI-powered analysis,
              risk assessments, and practical suggestions in language you can
              understand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link to="/upload" className="w-full sm:w-auto">
                <Button size="lg" icon={Upload} className="w-full">
                  Upload a Contract
                </Button>
              </Link>
              <Link to="/demo" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  icon={Eye}
                  className="w-full"
                >
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI analyzes your contracts and highlights what matters most
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-2xl hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600">
              Start free, upgrade when you need more detailed analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">Free</h3>
                <div className="text-4xl font-bold text-slate-800">$0</div>
                <p className="text-slate-600">Basic contract summaries</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">
                      Contract upload & basic summary
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">
                      Key obligations identification
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Basic risk alerts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 ring-2 ring-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">Pro</h3>
                <div className="text-4xl font-bold text-slate-800">$8</div>
                <p className="text-slate-600">Detailed risk analysis</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">
                      Detailed risk assessment
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">
                      Suggested contract edits
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button size="lg" icon={ArrowRight}>
                View Full Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Understand Your Contracts?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Everyday Legal Buddy for contract
            analysis
          </p>
          <Link to="/upload">
            <Button size="lg" variant="secondary" icon={Upload}>
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

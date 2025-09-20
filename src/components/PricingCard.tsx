import React from "react";
import { Check, Star } from "lucide-react";
import { Button } from "./ui/Button";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant?: "primary" | "outline";
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, onSelect }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md p-6 ${tier.popular ? "ring-2 ring-blue-500" : ""
        }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          {tier.name}
        </h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-slate-800">
            {tier.price}
          </span>
          <span className="text-slate-600">/{tier.period}</span>
        </div>
        <p className="text-slate-600 text-sm">{tier.description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.buttonVariant || "primary"}
        className="w-full"
        onClick={onSelect}
      >
        {tier.buttonText}
      </Button>
    </div>
  );
};

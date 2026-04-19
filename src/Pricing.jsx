import React, { useState } from "react";
import { Check, Zap, Crown, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: "0",
    period: "Forever",
    description: "Perfect for trying it out",
    icon: "🎬",
    features: [
      "3 videos per month",
      "Basic templates",
      "Standard quality",
      "Community support",
      "Basic music library",
    ],
    cta: "Get Started",
    highlighted: false,
    videos: 3,
  },
  {
    id: "starter",
    name: "Starter",
    price: "9.99",
    period: "/month",
    description: "For content creators",
    icon: "⚡",
    features: [
      "10 videos per month",
      "All templates",
      "HD quality",
      "Email support",
      "Full music library",
      "Custom music upload",
      "Social sharing",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    videos: 10,
    stripeId: "price_starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "29.99",
    period: "/month",
    description: "For serious creators",
    icon: "🚀",
    features: [
      "50 videos per month",
      "Premium templates",
      "4K quality",
      "Priority support",
      "Advanced effects",
      "Batch generation",
      "Video analytics",
      "Team collaboration",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
    videos: 50,
    stripeId: "price_pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: "59.99",
    period: "/month",
    description: "For professionals",
    icon: "💎",
    features: [
      "Unlimited videos",
      "All premium templates",
      "8K quality",
      "24/7 priority support",
      "Advanced AI features",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Upgrade to Premium",
    highlighted: false,
    videos: "unlimited",
    stripeId: "price_premium",
  },
  {
    id: "gold",
    name: "Gold",
    price: "250",
    period: "/year",
    description: "The ultimate package",
    icon: "👑",
    features: [
      "Unlimited videos forever",
      "All exclusive templates",
      "Highest quality (8K+)",
      "VIP 24/7 support",
      "Early access to features",
      "White-label options",
      "Priority processing",
      "Lifetime updates",
      "Exclusive community",
    ],
    cta: "Get Gold Membership",
    highlighted: false,
    videos: "unlimited",
    stripeId: "price_gold",
    badge: "BEST VALUE",
  },
];

function PricingCard({ plan, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -10 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
        plan.highlighted
          ? "ring-2 ring-primary shadow-2xl shadow-primary/30"
          : "glass hover:border-primary/30"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-3xl rounded-full -top-48" />
      </div>

      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold"
          >
            {plan.badge}
          </motion.div>
        </div>
      )}

      <div className="relative z-10 p-8 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{plan.icon}</div>
            {plan.highlighted && (
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            )}
          </div>
          <h3 className="text-2xl font-bold font-heading tracking-tight">
            {plan.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold font-heading">${plan.price}</span>
            <span className="text-muted-foreground text-sm">{plan.period}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {typeof plan.videos === "number"
              ? `${plan.videos} videos per month`
              : "Unlimited videos"}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan)}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            plan.highlighted
              ? "bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-2xl hover:shadow-primary/40 hover:scale-105"
              : "glass text-foreground hover:bg-white/10 hover:border-primary/50"
          }`}
        >
          {plan.cta}
          <ArrowRight size={16} />
        </button>

        {/* Features */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          {plan.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3"
            >
              <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/90">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonTable() {
  const features = [
    { name: "Videos per month", free: "3", starter: "10", pro: "50", premium: "∞", gold: "∞" },
    { name: "Video quality", free: "SD", starter: "HD", pro: "4K", premium: "8K", gold: "8K+" },
    { name: "Templates", free: "Basic", starter: "All", pro: "Premium", premium: "All", gold: "Exclusive" },
    { name: "Music library", free: "Limited", starter: "Full", pro: "Full", premium: "Full", gold: "Full" },
    { name: "Custom music", free: "No", starter: "Yes", pro: "Yes", premium: "Yes", gold: "Yes" },
    { name: "Social sharing", free: "No", starter: "Yes", pro: "Yes", premium: "Yes", gold: "Yes" },
    { name: "Batch generation", free: "No", starter: "No", pro: "Yes", premium: "Yes", gold: "Yes" },
    { name: "Analytics", free: "No", starter: "No", pro: "Yes", premium: "Yes", gold: "Yes" },
    { name: "Support", free: "Community", starter: "Email", pro: "Priority", premium: "24/7", gold: "VIP" },
    { name: "API access", free: "No", starter: "No", pro: "No", premium: "Yes", gold: "Yes" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 space-y-4"
    >
      <h3 className="text-2xl font-bold font-heading">Feature Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 font-semibold">Feature</th>
              {PRICING_PLANS.map((plan) => (
                <th key={plan.id} className="text-center py-4 px-4 font-semibold">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-foreground">{feature.name}</td>
                <td className="text-center py-4 px-4 text-muted-foreground">{feature.free}</td>
                <td className="text-center py-4 px-4 text-muted-foreground">{feature.starter}</td>
                <td className="text-center py-4 px-4 text-muted-foreground">{feature.pro}</td>
                <td className="text-center py-4 px-4 text-muted-foreground">{feature.premium}</td>
                <td className="text-center py-4 px-4 text-primary font-semibold">{feature.gold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = async (plan) => {
    if (plan.id === "free") {
      // Already free, just redirect
      window.location.href = "/";
      return;
    }

    // TODO: Integrate with Stripe
    // For now, show a message
    alert(`Upgrading to ${plan.name} - Stripe integration coming soon!`);
    console.log("Selected plan:", plan);
  };

  return (
    <div className="min-h-screen py-16 space-y-16 animate-fadeInUp">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Crown size={16} className="text-primary" />
          <span className="text-sm font-semibold text-primary">Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-5xl font-bold font-heading tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground">
          Start free and upgrade anytime. All plans include our full feature set.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {PRICING_PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <PricingCard plan={plan} onSelect={handleSelectPlan} />
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto">
        <ComparisonTable />
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <h2 className="text-3xl font-bold font-heading text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {[
            {
              q: "Can I change my plan anytime?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "What happens to my videos if I downgrade?",
              a: "All your videos remain in your library. You just get fewer monthly credits for new generations.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes! Start with our Free plan (3 videos/month) or try Starter with a 7-day free trial.",
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 30-day money-back guarantee on all paid plans. No questions asked.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards via Stripe. No PayPal or other methods at this time.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="glass rounded-2xl p-6 space-y-2"
            >
              <h3 className="font-semibold text-foreground">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-heading">Ready to create amazing videos?</h2>
        <p className="text-muted-foreground">
          Join thousands of creators using YES! Platform to bring their ideas to life.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 hover:scale-105"
        >
          <Zap size={20} />
          Get Started Now
        </button>
      </motion.div>
    </div>
  );
}

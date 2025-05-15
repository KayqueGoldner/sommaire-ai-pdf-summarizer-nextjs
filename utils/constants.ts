export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: process.env.NEXT_PUBLIC_BASIC_PLAN_PAYMENT_LINK!,
    priceId: process.env.NEXT_PUBLIC_BASIC_PLAN_PRICE_ID!,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: process.env.NEXT_PUBLIC_PRO_PLAN_PAYMENT_LINK!,
    priceId: process.env.NEXT_PUBLIC_PRO_PLAN_PRICE_ID!,
  },
];

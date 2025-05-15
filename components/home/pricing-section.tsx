import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { pricingPlans } from "@/utils/constants";
import { cn } from "@/lib/utils";

type Plans = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  items: string[];
  paymentLink: string;
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: Plans) => {
  return (
    <div className="relative w-full max-w-lg duration-300 hover:scale-105 hover:transition-all">
      <div
        className={cn(
          "relative z-10 flex h-full flex-col gap-4 rounded-2xl border border-gray-500/20 p-8 lg:gap-8",
          id === "pro" && "gap-5 border-2 border-rose-500",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold capitalize lg:text-xl">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div className="mb-1 flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 text-base leading-relaxed">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="flex w-full justify-center space-y-2">
          <Link
            href={paymentLink}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full border-2 bg-linear-to-r from-rose-800 to-rose-500 py-2 text-white hover:from-rose-500 hover:to-rose-800",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500",
            )}
          >
            Buy Now <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
        <div className="flex w-full items-center justify-center pb-12">
          <h2 className="mb-8 text-xl font-bold text-rose-500 uppercase">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

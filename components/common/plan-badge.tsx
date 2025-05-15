import { currentUser } from "@clerk/nextjs/server";
import { CrownIcon } from "lucide-react";

import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const PlanBadge = async () => {
  const user = await currentUser();

  if (!user?.id) return null;

  const email = user.emailAddresses[0].emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName = "Buy a plan";

  const plan = pricingPlans.find((p) => p.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 hidden flex-row items-center border-amber-300 bg-linear-to-r from-amber-100 to-amber-200 lg:flex",
        !priceId && "border-red-300 from-red-100 to-red-200",
      )}
    >
      <CrownIcon
        className={cn("mr-1 size-3 text-amber-600", !priceId && "text-red-600")}
      />
      {planName}
    </Badge>
  );
};

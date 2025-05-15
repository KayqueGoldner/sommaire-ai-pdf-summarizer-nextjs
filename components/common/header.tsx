import { FileTextIcon } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { NavLink } from "@/components/common/nav-link";
import { PlanBadge } from "@/components/common/plan-badge";

export const Header = () => {
  return (
    <nav className="container mx-auto flex items-center justify-between px-2 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex shrink-0 items-center gap-1 lg:gap-2">
          <FileTextIcon className="size-5 transform text-gray-900 transition duration-200 ease-in-out hover:rotate-12 lg:size-8" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            Sommaire
          </span>
        </NavLink>
      </div>

      <div className="flex gap-4 lg:items-center lg:justify-center lg:gap-12">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex items-center gap-2">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <PlanBadge />
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, className, children }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-gray-600 transition-colors duration-200 hover:text-rose-500",
        isActive && "text-rose-500",
        className,
      )}
    >
      {children}
    </Link>
  );
};

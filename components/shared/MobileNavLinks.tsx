"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

const MobileNavLinks = ({ href, children }: Props) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(href) && href.length > 1) || pathname === href;

  return (
    <Link
      href={href || "/"}
      className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded  ${
        isActive ? `bg-accent-2 text-light-1` : `text-dark-3`
      } `}>
      {children}
    </Link>
  );
};

export default memo(MobileNavLinks);

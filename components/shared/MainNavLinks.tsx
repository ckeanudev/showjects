"use client";
import { MdAddCircle, MdPersonSearch, MdHome } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import { leftNavLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

const MainNavLinks = ({ href, children }: Props) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(href) && href.length > 1) || pathname === href;

  return (
    <Link href={href || "/"}>
      <p
        className={`flex items-center gap-3 p-2.5 rounded-lg font-medium ${
          isActive
            ? `text-light-1 bg-accent-2 `
            : `text-dark-1 bg-light-1 hover:bg-light-2`
        } `}>
        {children}
      </p>
    </Link>
  );
};

export default memo(MainNavLinks);

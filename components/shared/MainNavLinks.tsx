"use client";
import { MdAddCircle, MdPersonSearch, MdHome } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import { leftNavLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const MainNavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {leftNavLinks.map((link, i: number) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <Link
            href={link.route}
            className={`flex items-center gap-3 p-2.5 rounded-lg font-medium ${
              isActive
                ? `text-light-1 bg-accent-2 `
                : `text-dark-1 bg-light-1 hover:bg-light-2`
            } `}>
            {i === 0 && <MdHome size={25} />}
            {i === 1 && <MdAddCircle size={25} />}
            {i === 2 && <BsFillCollectionFill size={22} />}
            {i === 3 && <MdPersonSearch size={25} />}
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default memo(MainNavLinks);

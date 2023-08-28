"use client";
import { MdAddCircle, MdPersonSearch, MdHome } from "react-icons/md";
import { BsFillCollectionFill, BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentUsername: string;
}

const MobileNavbar = ({ currentUsername }: Props) => {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 left-0 z-10 w-full bg-light-1 border-t  flex md:hidden items-center justify-between px-5 py-3">
      <Link
        href="/home"
        className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded  ${
          pathname === "/home" ? `bg-accent-2 text-light-1` : `text-dark-3`
        } `}>
        <MdHome size={24} />
        <p className="hidden sm:flex text-xs">Home</p>
      </Link>

      <Link
        href="/create-showject"
        className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded ${
          pathname === "/create-showject"
            ? `bg-accent-2 text-light-1`
            : `text-dark-3`
        }`}>
        <MdAddCircle size={24} />
        <p className="hidden sm:flex text-xs">Create</p>
      </Link>

      <Link
        href="/top-showjects"
        className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded ${
          pathname === "/top-showjects"
            ? `bg-accent-2 text-light-1`
            : `text-dark-3`
        }`}>
        <BsFillCollectionFill size={24} />
        <p className="hidden sm:flex text-xs">Showjects</p>
      </Link>

      <Link
        href="/search-developers"
        className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded ${
          pathname === "/search-developers"
            ? `bg-accent-2 text-light-1`
            : `text-dark-3`
        }`}>
        <MdPersonSearch size={24} />
        <p className="hidden sm:flex text-xs">Search</p>
      </Link>

      <Link
        href={`/${currentUsername}`}
        className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded ${
          pathname === `/${currentUsername}`
            ? `bg-accent-2 text-light-1`
            : `text-dark-3`
        }`}>
        <BsPersonCircle size={24} />
        <p className="hidden sm:flex text-xs">Profile</p>
      </Link>
    </section>
  );
};

export default MobileNavbar;

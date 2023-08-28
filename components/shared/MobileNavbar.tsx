// "use client";
import { MdAddCircle, MdPersonSearch, MdHome } from "react-icons/md";
import { BsFillCollectionFill, BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import MobileNavLinks from "./MobileNavLinks";

interface Props {
  currentUsername: string;
}

const MobileNavbar = ({ currentUsername }: Props) => {
  return (
    <section className="fixed bottom-0 left-0 z-10 w-full bg-light-1 border-t  flex md:hidden items-center justify-between px-5 py-3">
      <MobileNavLinks href="/">
        <MdHome size={24} />
        <p className="hidden sm:flex text-xs">Home</p>
      </MobileNavLinks>

      <MobileNavLinks href="/create-showject">
        <MdAddCircle size={24} />
        <p className="hidden sm:flex text-xs">Create</p>
      </MobileNavLinks>

      <MobileNavLinks href="/top-showjects">
        <BsFillCollectionFill size={24} />
        <p className="hidden sm:flex text-xs">Showjects</p>
      </MobileNavLinks>

      <MobileNavLinks href="/search-developers">
        <MdPersonSearch size={24} />
        <p className="hidden sm:flex text-xs">Search</p>
      </MobileNavLinks>

      <MobileNavLinks href={`/${currentUsername}`}>
        <BsPersonCircle size={24} />
        <p className="hidden sm:flex text-xs">Profile</p>
      </MobileNavLinks>
    </section>
  );
};

export default MobileNavbar;

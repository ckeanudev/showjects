import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { BiSolidLogOutCircle } from "react-icons/bi";

async function MainNavbar() {
  return (
    <nav className="fixed z-10 top-0 left-0 w-full bg-light-1 border-b-[1.5px] flex items-center justify-between py-2 px-5">
      <Image
        src="/images/logo-light.svg"
        alt="Showjects Logo"
        width={100}
        height={100}
        className=""
      />

      <SignedIn>
        <SignOutButton>
          <button className="flex items-center gap-1 bg-dark-1 hover:bg-dark-2 text-light-1 p-1 text-sm md:text-base rounded-full font-medium">
            <BiSolidLogOutCircle size={24} />
          </button>
        </SignOutButton>
      </SignedIn>
    </nav>
  );
}

export default MainNavbar;

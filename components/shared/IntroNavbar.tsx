"use client";

import Image from "next/image";
import { BiSolidLogInCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface Props {}

const IntroNavbar = (prop: Props) => {
  const router = useRouter();

  return (
    <nav className="w-full bg-light-1 border-b-[1.5px]">
      <div
        className={`max-w-[1200px] mx-auto flex items-center justify-between py-3 px-5`}>
        <div className="">
          <Image
            src="/images/logo-light.svg"
            alt="Showjects Logo"
            width={130}
            height={130}
            className=""
          />
        </div>
        <div className="">
          <button
            onClick={() => router.push("/sign-in")}
            className="flex items-center gap-1 bg-dark-1 hover:bg-dark-2 text-light-1 py-1 md:py-1.5 pl-4 md:pl-5 pr-2 md:pr-3 text-sm md:text-base rounded-full font-medium">
            Sign In <BiSolidLogInCircle size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default IntroNavbar;

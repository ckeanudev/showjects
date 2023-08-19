"use client";
import ProfileCard from "../cards/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { BiSolidLogOutCircle } from "react-icons/bi";
import MainNavLinks from "./MainNavLinks";
import { memo } from "react";

interface Props {
  authUserId: string;
  dbUserId: string;
  profilePhoto: string;
  name: string;
  username: string;
}

const LeftNavbar = ({
  authUserId,
  dbUserId,
  profilePhoto,
  name,
  username,
}: Props) => {
  return (
    <section className="sticky top-0 left-0 h-screen bg-light-1 p-6 w-[320px] flex flex-col">
      <Image
        src="/images/logo-light.svg"
        alt="showjects logo"
        width={140}
        height={140}
        className=""
      />

      <nav className="border-y-[1px] mt-5 py-5 flex flex-col justify-between gap-10 flex-1 overflow-auto">
        <div className="flex flex-col gap-4">
          <Link href={`/profile/${dbUserId}`}>
            <ProfileCard
              userId={dbUserId || ""}
              userAuthId={authUserId || ""}
              profileImg={profilePhoto || ""}
              name={name || ""}
              username={username || ""}
            />
          </Link>

          <MainNavLinks />
        </div>

        <SignedIn>
          <SignOutButton>
            <button className="flex items-center gap-3 p-2.5 border rounded-lg font-medium text-light-2 bg-dark-1 hover:bg-dark-2">
              <BiSolidLogOutCircle size={25} />
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </nav>
    </section>
  );
};

export default memo(LeftNavbar);

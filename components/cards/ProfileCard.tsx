"use client";
import Image from "next/image";
import { memo } from "react";
import { usePathname } from "next/navigation";

interface Props {
  profileImg: string;
  name: string;
  username: string;
}

const ProfileCard = ({ profileImg, name, username }: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-4 p-2.5 border rounded-lg ${
        pathname === `/${username}` ? `bg-accent-2` : `hover:bg-light-2`
      }`}>
      <Image
        src={profileImg}
        alt={name}
        width={100}
        height={100}
        className="rounded-full min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] object-cover"
      />

      <div className="">
        <p
          className={`text-base font-semibold ${
            pathname === `/${username}` ? `text-light-1` : `text-dark-1`
          }`}>
          {name || ""}{" "}
        </p>
        <p
          className={`${
            pathname === `/${username}` ? `text-light-4` : `text-dark-3`
          } text-xs`}>
          @{username || ""}
        </p>
      </div>
    </div>
  );
};

export default memo(ProfileCard);

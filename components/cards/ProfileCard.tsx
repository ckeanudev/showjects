import Image from "next/image";
import { memo } from "react";

interface Props {
  userId: string;
  userAuthId: string;
  profileImg: string;
  name: string;
  username: string;
}

const ProfileCard = ({
  userId,
  userAuthId,
  profileImg,
  name,
  username,
}: Props) => {
  return (
    <div className="flex items-center gap-4 p-2.5 border rounded-lg hover:bg-light-2">
      <Image
        src={profileImg}
        alt={name}
        width={100}
        height={100}
        className="rounded-full min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] object-cover"
      />

      <div className="">
        <p className="text-base font-semibold text-dark-1">{name || ""} </p>
        <p className="text-dark-3 text-xs">@{username || ""}</p>
      </div>
    </div>
  );
};

export default memo(ProfileCard);

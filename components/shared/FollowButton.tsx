"use client";
import { followUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props {
  currentUserDbId: string;
  userPageDbId: string;
  userFollowers: string[];
}

const FollowButton = ({
  currentUserDbId,
  userPageDbId,
  userFollowers,
}: Props) => {
  const [loadSpin, setLoadSpin] = useState<boolean>(false);
  const path = usePathname();

  const followFun = async (follow: boolean) => {
    setLoadSpin(true);

    await followUser(currentUserDbId, userPageDbId, follow, path);

    setLoadSpin(false);
  };

  return (
    <>
      {/* ------- Button to follow  -------*/}
      {!loadSpin && !userFollowers.includes(currentUserDbId) && (
        <button
          onClick={() => {
            followFun(true);
          }}
          className="absolute flex gap-2 items-center justify-center bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] bg-accent-1 hover:bg-accent-1_hover font-medium text-light-1 text-sm w-[100px] p-1 rounded-md cursor-pointer">
          {loadSpin && <CgSpinner size={20} className="animate-spin" />}
          Follow
        </button>
      )}

      {/* ------- Button to unfollow  -------*/}
      {!loadSpin && userFollowers.includes(currentUserDbId) && (
        <button
          onClick={() => {
            followFun(false);
          }}
          className="absolute flex gap-2 items-center justify-center bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] bg-accent-1 hover:bg-accent-1_hover font-medium text-light-1 text-sm w-[100px] p-1 rounded-md cursor-pointer">
          {loadSpin && <CgSpinner size={20} className="animate-spin" />}
          Unfollow
        </button>
      )}

      {/* ------- Button for loading  -------*/}
      {loadSpin && (
        <button className="cursor-default absolute flex gap-2 items-center justify-center bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] bg-accent-1 hover:bg-accent-1_hover font-medium text-light-1 text-sm w-[100px] p-1 rounded-md">
          <CgSpinner size={20} className="animate-spin" />
        </button>
      )}
    </>
  );
};

export default FollowButton;

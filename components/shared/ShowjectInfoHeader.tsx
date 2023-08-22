"use client";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { reactLoveShowject } from "@/lib/actions/showject.action";
import { usePathname } from "next/navigation";

interface Props {
  authorId: string;
  showjectId: string;
  showjectLoveCount: string[];
  currentDbUser: string;
}

const ShowjectLoveButton = ({
  authorId,
  showjectId,
  showjectLoveCount,
  currentDbUser,
}: Props) => {
  const [loadSpin, setLoadSpin] = useState<boolean>(false);
  const pathname = usePathname();

  const loveReact = async (reactLove: boolean) => {
    setLoadSpin(true);

    await reactLoveShowject(currentDbUser, showjectId, reactLove, pathname);

    setLoadSpin(false);
  };

  return (
    <div>
      {/* ------- Button for react love  -------*/}
      {!loadSpin && !showjectLoveCount.includes(currentDbUser) && (
        <button
          onClick={() => {
            if (authorId === currentDbUser) {
              alert("Author can't love their own showject");
            } else {
              loveReact(true);
            }
          }}
          className="flex gap-2 items-center text-accent-2 hover:bg-accent-2/10 p-2 rounded-md font-medium">
          <FaRegHeart size={20} /> {showjectLoveCount.length || 0}
        </button>
      )}

      {/* ------- Button for unreact love  -------*/}
      {!loadSpin && showjectLoveCount.includes(currentDbUser) && (
        <button
          onClick={() => {
            if (authorId === currentDbUser) {
              alert("Author can't love their own showject");
            } else {
              loveReact(false);
            }
          }}
          className="flex gap-2 items-center text-accent-2 bg-accent-2/10 p-2 rounded-md font-medium">
          <FaHeart size={20} /> {showjectLoveCount.length || 0}
        </button>
      )}

      {/* ------- Button for loading  -------*/}
      {loadSpin && (
        <button className="flex gap-2 items-center text-accent-2 hover:bg-accent-2/10 p-2 rounded-md font-medium cursor-default">
          <CgSpinner size={20} className="animate-spin" />{" "}
          {showjectLoveCount.length || 0}
        </button>
      )}
    </div>
  );
};

export default ShowjectLoveButton;

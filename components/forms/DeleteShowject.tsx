"use client";
import { deleteShowject } from "@/lib/actions/showject.action";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props {
  showjectId: string;
  userId: string;
}

const DeleteShowject = ({ showjectId, userId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [loadSpin, setLoadSpin] = useState<boolean>(false);

  const deleteShowjectFun = async () => {
    setLoadSpin(true);

    await deleteShowject(showjectId, userId, pathname);

    // setLoadSpin(false);

    router.back();
  };

  return (
    <div className="">
      {!loadSpin && (
        <button
          onClick={deleteShowjectFun}
          className="w-full flex item-center justify-center mt-10 bg-accent-2 p-2 text-light-1 rounded-md font-medium hover:bg-accent-2_hover">
          Delete this showject
        </button>
      )}

      {loadSpin && (
        <button className="w-full flex gap-2 item-center justify-center mt-10 bg-accent-2_hover p-2 text-light-1 rounded-md font-medium cursor-default">
          <CgSpinner size={22} className="animate-spin" /> Delete this showject
        </button>
      )}
    </div>
  );
};

export default DeleteShowject;

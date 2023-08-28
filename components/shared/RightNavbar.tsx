import { memo } from "react";

interface Props {
  authUserId: String;
  dbUserId: String;
}

const RightNavbar = ({ authUserId, dbUserId }: Props) => {
  return (
    <section className="hidden xl:flex sticky top-0 right-0 h-screen bg-light-1 p-6 w-[280px] flex-col gap-3">
      <div className="flex-1 p-2">
        <h2 className="font-semibold text-dark-1">Suggested Developers</h2>
      </div>
      <div className="flex-1 p-2">
        <h2 className="font-semibold text-dark-1">Developers you respected</h2>
      </div>
    </section>
  );
};

export default memo(RightNavbar);

import { memo } from "react";

const RightNavbar = () => {
  return (
    <section className="sticky top-0 right-0 h-screen bg-light-1 p-6 w-[280px] flex flex-col gap-3">
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

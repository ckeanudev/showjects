import { fetchShowjectInfo } from "@/lib/actions/showject.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { showjectId: string } }) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const showjectInfo = await fetchShowjectInfo(params.showjectId);
  console.log(showjectInfo);

  return (
    <section className="flex-1 min-h-screen bg-light-2 p-3">
      <div className="max-w-[800px] mx-auto px-3 py-10"></div>
    </section>
  );
};

export default page;

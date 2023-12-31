import UpdateShowject from "@/components/forms/UpdateShowject";
import { fetchShowjectInfo } from "@/lib/actions/showject.action";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { showjectId: string } }) => {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch user's info from DB and if not onboarded  the user will redirect to onboarding page ------- //
  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const showjectInfo = await fetchShowjectInfo(params.showjectId);

  return (
    <section className="min-h-screen flex-1 bg-light-2 px-3 pt-3 pb-16">
      <h1 className="text-base md:text-xl font-semibold text-dark-1 border-b-[1px] pb-2">
        {`Edit Showject | ${showjectInfo.title || ""}`}
      </h1>

      <div className="max-w-[800px] mx-auto px-1 sm:px-3 md:px-5 py-5">
        <UpdateShowject
          _id={showjectInfo._id}
          title={showjectInfo.title}
          showjectImg={showjectInfo.showjectImg}
          description={showjectInfo.description}
          sourceCodeUrl={showjectInfo.sourceCodeUrl}
          liveUrl={showjectInfo.liveUrl}
        />
      </div>
    </section>
  );
};

export default Page;

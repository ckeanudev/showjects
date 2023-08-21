import CreateShowject from "@/components/forms/CreateShowject";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="flex-1 min-h-screen bg-light-2 p-3">
      <h1 className="text-xl font-semibold text-dark-1 border-b-[1px] pb-2">
        Create your showject
      </h1>

      <div className="max-w-[800px] mx-auto px-5 pt-5 pb-16">
        <CreateShowject userId={userInfo._id} />
      </div>
    </section>
  );
}

export default Page;

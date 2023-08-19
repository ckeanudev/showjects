import CreateShowject from "@/components/forms/CreateShowject";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="flex-1 min-h-[200vh]  bg-light-2 p-3">
      <h1 className="text-xl font-semibold text-dark-1 border-b-[1px] pb-2">
        Create your showject
      </h1>

      <div className="max-w-[800px] mx-auto p-5">
        <CreateShowject userId={userInfo._id} />
      </div>
    </section>
  );
}

export default Page;

import SearchDevelopers from "@/components/forms/SearchDevelopers";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch user's info from DB and if not onboarded  the user will redirect to onboarding page ------- //
  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="min-h-screen flex-1 bg-light-2 px-3 pt-3 pb-16">
      <h1 className="text-base md:text-xl font-semibold text-dark-1 border-b-[1px] pb-2">
        Search developers
      </h1>

      <div className="max-w-[800px] mx-auto px-1 sm:px-3 md:px-5 py-5">
        {/* <SearchDevelopers /> */}
      </div>
    </section>
  );
}

export default Page;

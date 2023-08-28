import ProfileCollection from "@/components/shared/ProfileCollection";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  fetchUserByAuthID,
  fetchUserByUsername,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { username: string } }) => {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // ------- Fetch userpage's info from the DB ------- //
  const userPageInfo = await fetchUserByUsername(params.username);

  return (
    <section className="flex-1 min-h-screen bg-light-2 px-3 pt-3 pb-16">
      <div className="max-w-[800px] mx-auto px-3 py-10">
        <ProfileHeader currentUserDb={userInfo} userInfo={userPageInfo} />

        <hr />

        <ProfileCollection currentUserId={user.id} userInfo={userPageInfo} />
      </div>
    </section>
  );
};

export default Page;

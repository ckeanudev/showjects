import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  // ------- Fetch current logged in user's info from clerk and if not logged in sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch user's info from DB and if user is onboarded he/she will redirect to homepage ------- //
  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || `${user?.firstName} ${user?.lastName}` || "",
    email: userInfo?.email || user?.emailAddresses[0].emailAddress || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",

    job: userInfo?.job || "",
    location: userInfo?.location || "",
    personalWebsite: userInfo?.personalWebsite || "",
    github: userInfo?.github || "",
    linkedIn: userInfo?.linkedIn || "",
    facebook: userInfo?.facebook || "",
    twitter: userInfo?.twitter || "",
    instagram: userInfo?.instagram || "",
  };

  return (
    <section className="flex-1 min-h-screen bg-light-2 px-3 pt-3 pb-16">
      <h1 className="text-base md:text-xl font-semibold text-dark-1 border-b-[1px] pb-2 mb-5">
        Edit Profile
      </h1>

      <div className="max-w-[740px] mx-auto">
        <AccountProfile user={userData} btnTitle="Save Changes" />
      </div>
    </section>
  );
};

export default Page;

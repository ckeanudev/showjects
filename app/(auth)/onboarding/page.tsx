// import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const userInfo = await fetchUserByAuthID(user.id);
  if (userInfo?.onboarded) redirect("/home");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || `${user?.firstName} ${user?.lastName}` || "",
    email: userInfo?.email || user?.emailAddresses[0].emailAddress || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,

    job: userInfo?.job,
    location: userInfo?.location,
    personalWebsite: userInfo?.personalWebsite,
    github: userInfo?.github,
    linkedIn: userInfo?.linkedIn,
    facebook: userInfo?.facebook,
    twitter: userInfo?.twitter,
    instagram: userInfo?.instagram,
  };

  return (
    <main className="w-full min-h-screen mb-5">
      <section className="max-w-[700px] mx-auto p-8 bg-light-2 rounded-lg">
        <h1 className="text-center mb-8 font-semibold text-xl text-dark-1">
          Complete your profile to use Showjects
        </h1>

        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default page;

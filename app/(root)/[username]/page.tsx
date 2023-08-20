import ProfileCollection from "@/components/shared/ProfileCollection";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUserByUsername } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { username: string } }) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUserByUsername(params.username);
  //   if (!userInfo?.onboarded)

  console.log(userInfo);
  console.log(params.username);

  return (
    <section className="flex-1 min-h-screen bg-light-2 p-3">
      <ProfileHeader userInfo={userInfo} />
      <ProfileCollection userInfo={userInfo} />
    </section>
  );
};

export default Page;

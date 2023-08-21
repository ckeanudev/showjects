import ProfileCollection from "@/components/shared/ProfileCollection";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUserByUsername } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { username: string } }) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUserByUsername(params.username);

  return (
    <section className="flex-1 min-h-screen  bg-light-2 p-3">
      <div className="max-w-[800px] mx-auto px-3 py-10">
        <ProfileHeader userInfo={userInfo} />
        <ProfileCollection userInfo={userInfo} />
      </div>
    </section>
  );
};

export default Page;

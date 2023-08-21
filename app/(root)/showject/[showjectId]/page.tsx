import { fetchShowjectInfo } from "@/lib/actions/showject.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { showjectId: string } }) => {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch showject info from the DB ------- //
  const showjectInfo = await fetchShowjectInfo(params.showjectId);

  return (
    <section className="flex-1 min-h-screen bg-light-2 p-3">
      <div className="max-w-[800px] mx-auto px-3 py-10">
        <Image
          src={showjectInfo.showjectImg}
          alt={`${showjectInfo.title}'s pic`}
          width={700}
          height={700}
          className="w-full max-h-[400px] rounded-lg bg-light-3 object-contain mb-3"
        />

        <h2 className="text-2xl font-bold text-dark-1 mb-2">
          {showjectInfo.title}
        </h2>

        <p className="text-sm text-dark-3 font-medium">
          {showjectInfo.description}
        </p>
      </div>
    </section>
  );
};

export default page;

import DeleteShowject from "@/components/forms/DeleteShowject";
import { fetchShowjectInfo } from "@/lib/actions/showject.action";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { showjectId: string } }) => {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch user's info from DB and if not onboarded  the user will redirect to onboarding page ------- //
  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const showjectInfo = await fetchShowjectInfo(params.showjectId);

  if (userInfo._id.toString() !== showjectInfo.author._id.toString())
    redirect("/home");

  const converDateTime = (date: any) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];

    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

    let hour;

    if (date.getHours() > 12) {
      let tempData = date.getHours() - 12;
      hour = tempData > 9 ? date.getHours() : "0" + tempData;
    } else {
      hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    }

    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    const session = date.getHours() > 12 ? "PM" : "AM";

    return `${month} ${day}, ${date.getFullYear()} | ${hour}:${minute} ${session}`;
  };

  return (
    <section className="min-h-screen flex-1 bg-light-2 px-3 pt-3 pb-16">
      <h1 className="text-xl font-semibold text-dark-1 border-b-[1px] pb-2 mb-5">
        {`Delete Showject | ${showjectInfo.title}`}
      </h1>

      <div className="max-w-[800px] mx-auto px-1 sm:px-3 md:px-5 py-5">
        <Image
          src={showjectInfo.showjectImg}
          alt="showject photo"
          width={800}
          height={800}
          priority
          className="object-contain object-center w-full max-h-[260px] md:max-h-[320px] lg:max-h-[400px] p-3 rounded-lg bg-light-3 mb-3"
        />

        <h2 className="text-xl md:text-2xl font-bold text-dark-1 mb-1">
          {showjectInfo.title}
        </h2>

        <p className="text-xs md:text-sm text-dark-3 font-medium">
          {showjectInfo.description}
        </p>

        <div className="mt-4 flex flex-col gap-1">
          {showjectInfo.liveUrl != "" && (
            <p className="text-xs md:text-sm font-medium text-dark-2">
              Live URL:{" "}
              <a
                className="text-accent-1 hover:text-accent-1_hover"
                href={showjectInfo.liveUrl}
                target="_blank"
                rel="noopener noreferrer">
                {showjectInfo.liveUrl}
              </a>{" "}
            </p>
          )}

          <p className="text-xs md:text-sm font-medium text-dark-2">
            Source Code URL:{" "}
            <a
              className="text-accent-2 hover:text-accent-2_hover"
              href={showjectInfo.sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer">
              {showjectInfo.sourceCodeUrl}
            </a>
          </p>
        </div>

        <hr className="my-4" />

        <p className="text-xs text-dark-3">
          Published on {converDateTime(showjectInfo.createdAt)}
        </p>

        <hr className="my-4" />

        <DeleteShowject showjectId={showjectInfo._id} userId={userInfo._id} />
      </div>
    </section>
  );
};

export default Page;

import CommentCard from "@/components/cards/CommentCard";
import Comment from "@/components/forms/Comment";
import { fetchShowjectInfo } from "@/lib/actions/showject.action";
import { fetchUserByAuthID } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { showjectId: string } }) => {
  // ------- Fetch current logged in user's info from clerk and if not logged in the user will redirect to sign in page ------- //
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // ------- Fetch user's info from DB and if not onboarded  the user will redirect to onboarding page ------- //
  const userInfo = await fetchUserByAuthID(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // ------- Fetch showject info from the DB ------- //
  const showjectInfo = await fetchShowjectInfo(params.showjectId);
  console.log(showjectInfo.comments);

  // ------- function to convert timestamp to actual date and time ------- //
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

    const month = months[date.getMonth() - 1];

    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

    let hour;

    if (date.getHours() > 12) {
      let tempData = date.getHours() - 12;
      hour = tempData > 9 ? date.getHours() : "0" + date.getHours();
    } else {
      hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    }

    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    const session = date.getHours() > 12 ? "PM" : "AM";

    return `${month} ${day}, ${date.getFullYear()} | ${hour}:${minute} ${session}`;
  };

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

        <h2 className="text-2xl font-bold text-dark-1 mb-1">
          {showjectInfo.title}
        </h2>

        <p className="text-sm text-dark-3 font-medium">
          {showjectInfo.description}
        </p>

        <div className="mt-4 flex flex-col gap-1">
          {showjectInfo.liveUrl != "" && (
            <p className="text-sm font-medium text-dark-2">
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

          <p className="text-sm font-medium text-dark-2">
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

        {/* ------------ Comment Section ------------ */}
        <div className="flex flex-col">
          <Comment
            showjectId={showjectInfo?._id}
            currentUserImg={userInfo?.image}
            currentUserId={userInfo?._id}
            commentUnderShowject={true}
          />
        </div>

        <hr className="my-4" />

        <div className="">
          {showjectInfo.comments.length > 0
            ? showjectInfo.comments.map((comment: any) => (
                <CommentCard
                  key={comment._id}
                  _id={comment._id}
                  id={comment.id}
                  name={comment.author.name}
                  username={comment.author.username}
                  image={comment.author.image}
                  text={comment.text}
                  children={comment.children}
                  createdAt={comment.createdAt}
                />
              ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default page;

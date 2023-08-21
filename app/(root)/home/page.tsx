import MainShowjectCard from "@/components/cards/MainShowjectCard";
import { fetchShowjects } from "@/lib/actions/showject.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const result = await fetchShowjects();

  return (
    <section className="min-h-screen flex-1 bg-light-2 p-3">
      <h1 className="text-xl font-semibold text-dark-1 border-b-[1px] pb-2 mb-5">
        Home
      </h1>

      <div className="max-w-[740px] mx-auto">
        {result.length > 0 ? (
          result.map((data) => (
            <MainShowjectCard
              key={data._id}
              showjectId={data._id}
              image={data.showjectImg}
              title={data.title}
              description={data.description}
              author={data.author}
              sourceCodeUrl={data.sourceCodeUrl}
              liveUrl={data.liveUrl}
              comments={data.comments}
              loveCount={data.loveCount}
              createdAt={data.createdAt}
            />
          ))
        ) : (
          <p>No Showjects found</p>
        )}
      </div>
    </section>
  );
}

export default Page;

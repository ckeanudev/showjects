import { smallProjects } from "@/constant";
import ShowjectsCard from "../cards/ShowjectsCard";
import { fetchTopShowjectForLandingPage } from "@/lib/actions/showject.action";

const TopShowjects = async () => {
  const topShowjects = await fetchTopShowjectForLandingPage();

  return (
    <section className="w-full bg-light-1">
      <div className="max-w-[1200px] px-3 pt-20 pb-16 mx-auto">
        <h2 className="text-center text-dark-3 text-2xl font-semibold mb-10">
          Top Showjects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-3">
          {topShowjects.map((project, i: number) => {
            return (
              i < 6 && (
                <ShowjectsCard
                  key={i}
                  id={project._id}
                  title={project.title}
                  imgUrl={project.showjectImg}
                  lovedCount={project.loveCount.length}
                  commentCount={project.comments.length}
                  landingPageRender={true}
                  author={project.author}
                />
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopShowjects;

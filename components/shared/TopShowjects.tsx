import { smallProjects } from "@/constant";
import ShowjectsCard from "../cards/ShowjectsCard";

const TopShowjects = () => {
  return (
    <section className="w-full bg-light-1 min-h-screen">
      <div className="max-w-[1200px] px-3 pt-20 pb-10 mx-auto">
        <h2 className="text-center text-dark-3 text-2xl font-semibold mb-10">
          Top Showjects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-3">
          {smallProjects.map((project, i: number) => {
            return (
              i < 6 && (
                <ShowjectsCard
                  key={i}
                  id={project.title}
                  title={project.title}
                  imgUrl={project.imgSrc}
                  techUsed={project.techUsed}
                  lovedCount={project.loved}
                  commentCount={project.loved}
                  landingPageRender={true}
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

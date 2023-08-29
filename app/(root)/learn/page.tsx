import LearnCard from "@/components/cards/LearnCard";
import { learnSite } from "@/constant";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-screen flex-1 bg-light-2 px-3 pt-3 pb-20">
      <h1 className="text-base md:text-xl font-semibold text-dark-1 border-b-[1px] pb-2 mb-5">
        Learn Programming
      </h1>

      <div className="max-w-[800px] mx-auto grid grid-cols-1 gap-5">
        {learnSite.map((data, i: number) => (
          <LearnCard
            key={i}
            title={data.title}
            image={data.image}
            link={data.link}
            description={data.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;

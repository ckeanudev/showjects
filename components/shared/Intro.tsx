"use client";

import { BiSolidLogInCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Intro = () => {
  const router = useRouter();

  return (
    <section className="bg-home-section bg-cover bg-no-repeat w-full bg-light-2">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center px-4 pt-8 sm:pt-10 md:pt-20 pb-14">
        <h1 className="text-accent-1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold text-center mb-4 sm:mb-8">
          Showcasing the Artistry of <br /> Development
        </h1>

        <p className="text-dark-2 text-center text-sm sm:text-base md:text-xl xl:text-2xl font-medium mb-8 md:mb-10">
          Showcase your software development projects with the other developers
          on this <br className="hidden lg:block" /> platform where they can
          review your code and help you get better.
        </p>

        <button
          onClick={() => router.push("/sign-in")}
          className="flex gap-2 items-center bg-accent-2 hover:bg-accent-2_hover pl-8 md:pl-10 pr-6 md:pr-8 py-1.5 md:py-2.5 text-light-1 rounded-full text-base md:text-xl font-semibold mb-12 md:mb-16">
          Sign In Now <BiSolidLogInCircle size={28} />
        </button>

        <h2 className="text-dark-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
          Share, Shine, Succeed!
        </h2>
      </div>
    </section>
  );
};

export default Intro;

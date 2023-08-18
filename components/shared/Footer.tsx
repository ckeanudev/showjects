import Image from "next/image";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-dark-1">
      <section className="px-4 pt-10 pb-14 max-w-[1200px] mx-auto flex flex-col gap-4 sm:gap-1 sm:flex-row justify-start items-center sm:justify-between">
        <Image
          src="/images/logo-dark.svg"
          alt="Showjects Logo"
          width={150}
          height={150}
          className=""
        />

        <p className="text-lg text-dark-5">
          By{" "}
          <a
            href="https://github.com/ckeanudev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-2">
            Ckeanu
          </a>{" "}
        </p>
      </section>
    </footer>
  );
};

export default memo(Footer);

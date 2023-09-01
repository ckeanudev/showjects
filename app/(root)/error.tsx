"use client";

import Link from "next/link";

const Error = () => {
  return (
    <section className="flex-1 min-h-screen bg-light-2 px-3 pt-3 pb-16 flex flex-col items-center justify-center">
      <h1 className="text-center text-xl font-semibold text-dark-1 mb-3">
        Oops! something went wrong
      </h1>

      <Link href="/home">
        <button className="bg-accent-2 text-light-1 hover:bg-accent-2_hover py-1 px-2 rounded">
          Go home
        </button>
      </Link>
    </section>
  );
};

export default Error;

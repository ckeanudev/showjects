"use client";
import { memo } from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  link: string;
  description: string;
}

const LearnCard = ({ title, image, link, description }: Props) => {
  return (
    <article className="flex flex-col sm:grid grid-cols-2 gap-0 sm:gap-2 bg-light-1 rounded-md shadow overflow-hidden">
      <a href={link} target="_blank" className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={500}
          className="w-full h-[140px] sm:h-[200px] object-cover object-center sm:hover:scale-110 transition"
        />
      </a>
      <div className="flex flex-col justify-center items-start p-3">
        <h3 className="text-base sm:text-xl font-semibold text-dark-1 mb-1">
          {title}
        </h3>
        <p className="text-xs text-dark-2">{description}</p>
      </div>
    </article>
  );
};

export default memo(LearnCard);

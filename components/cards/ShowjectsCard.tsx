import Image from "next/image";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { memo } from "react";

interface Props {
  id: string;
  title: string;
  imgUrl: string;
  techUsed: string[];
  lovedCount?: number | 0;
  commentCount?: number | 0;
  landingPageRender: boolean;
}

const ShowjectsCard = ({
  id,
  title,
  imgUrl,
  techUsed,
  lovedCount,
  commentCount,
  landingPageRender,
}: Props) => {
  return (
    <article className="w-full rounded-xl overflow-hidden flex flex-col shadow-md">
      <div className="w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          width={300}
          height={150}
          className="w-full h-[182px] object-contain"
        />
      </div>
      <div className="w-full pt-5 pb-4 px-6">
        <p className="text-xs text-dark-4">By Ckeanu</p>
        <h3 className="font-semibold text-dark-1 text-lg">{title}</h3>

        <div className="flex items-center flex-wrap gap-1 mt-1">
          {techUsed.map((tech, i: number) => (
            <p
              className="text-xs bg-dark-4 text-light-2 py-0.5 px-2 rounded"
              key={i}>
              {tech}
            </p>
          ))}
        </div>

        <div className="flex items-center mt-2 gap-2 border-t-[1px] pt-2">
          <button
            className={`flex items-center px-1.5 py-0.5 rounded gap-2 text-accent-2 ${
              !landingPageRender
                ? `hover:text-light-2 hover:bg-accent-2 cursor-pointer`
                : `cursor-default`
            }`}>
            <FaHeart />

            {lovedCount}
          </button>
          <button
            className={`flex items-center px-1.5 py-0.5 rounded gap-2 text-accent-1 ${
              !landingPageRender
                ? `hover:text-light-2 hover:bg-accent-1 cursor-pointer`
                : `cursor-default`
            }`}>
            <FaCommentDots />

            {commentCount}
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(ShowjectsCard);

import Link from "next/link";
import Image from "next/image";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { memo } from "react";

interface Props {
  id: any;
  title: string;
  imgUrl: string;
  lovedCount?: number | 0;
  commentCount?: number | 0;
  landingPageRender: boolean;
  author: any;
}

const ShowjectsCard = ({
  id,
  title,
  imgUrl,
  lovedCount,
  commentCount,
  landingPageRender,
  author,
}: Props) => {
  return (
    <Link href={`/showject/${id}`}>
      <article className="w-full rounded-xl overflow-hidden flex flex-col shadow-md p-2 hover:translate-y-[-10px] transition">
        <div className="w-full overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            width={300}
            height={150}
            className="w-full h-[182px] object-contain bg-light-3 rounded-md"
          />
        </div>
        <div className="w-full px-3 pt-3 pb-1">
          <p className="text-xs text-dark-4">{`By ${author.name}`}</p>
          <h3 className="font-semibold text-dark-1 text-lg">{title}</h3>

          <div className="flex items-center mt-2 gap-2 border-t-[1px] pt-2">
            <p
              className={`flex items-center px-1.5 py-0.5 rounded gap-2 text-accent-2 ${
                !landingPageRender
                  ? `hover:text-light-2 hover:bg-accent-2 cursor-pointer`
                  : `cursor-default`
              }`}>
              <FaHeart />

              {lovedCount}
            </p>
            <p
              className={`flex items-center px-1.5 py-0.5 rounded gap-2 text-accent-1 ${
                !landingPageRender
                  ? `hover:text-light-2 hover:bg-accent-1 cursor-pointer`
                  : `cursor-default`
              }`}>
              <FaCommentDots />

              {commentCount}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default memo(ShowjectsCard);

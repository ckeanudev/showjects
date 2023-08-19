import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";

interface Props {
  showjectId: string;
  image: string;
  title: string;
  description: string;
  author: any;
  sourceCodeUrl: string;
  liveUrl: string;
  comments: any;
  loveCount: any;
  createdAt: string;
}

const MainShowjectCard = ({
  showjectId,
  image,
  title,
  description,
  author,
  sourceCodeUrl,
  liveUrl,
  comments,
  loveCount,
  createdAt,
}: Props) => {
  return (
    <article className="bg-light-1 rounded-xl p-5 flex flex-col gap-3 mb-8 shadow-md">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${author.id}`}>
          <Image
            src={author.image}
            alt={title}
            width={70}
            height={70}
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${author.id}`}>
            <p className="text-dark-1 font-semibold hover:underline">
              {author.name}
            </p>
          </Link>
          <p className="text-xs text-dark-3">@{author.username}</p>
        </div>
      </div>

      <Link href={`/showject/${showjectId}`}>
        <div className="bg-light-2 hover:bg-light-3 p-4 rounded-xl">
          <Image
            src={image}
            alt={title || ""}
            width={800}
            height={400}
            className="w-full h-[340px] object-contain rounded-lg bg-dark-4"
          />

          <p className="text-sm text-dark-2 mt-3">{description}</p>
        </div>
      </Link>

      <div className="flex items-center gap-5 px-3 pt-3">
        <button className="flex gap-2 items-center text-accent-2 font-medium">
          <FaRegHeart size={22} /> {loveCount.length || 0}
        </button>
        <button className="flex gap-2 items-center text-accent-1 font-medium">
          <FaRegCommentDots size={22} />
          {comments.length || 0}
        </button>
      </div>
    </article>
  );
};

export default memo(MainShowjectCard);

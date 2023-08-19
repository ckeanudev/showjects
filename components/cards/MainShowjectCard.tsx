import Image from "next/image";
import { memo } from "react";

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
}: Props) => {
  return (
    <article className="bg-light-1 rounded-lg p-3">
      <div className="">
        <Image
          src={author.image}
          alt={title}
          width={100}
          height={100}
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
      </div>
      <div className=""></div>
      <div className=""></div>
    </article>
  );
};

export default memo(MainShowjectCard);

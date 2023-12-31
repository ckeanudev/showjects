import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  currentUserId: string;
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
  currentUserId,
}: Props) => {
  // ------- function to convert timestamp to actual date and time ------- //
  const converDateTime = (date: any) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];

    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

    let hour;

    if (date.getHours() > 12) {
      let tempData = date.getHours() - 12;
      hour = tempData > 9 ? date.getHours() : "0" + tempData;
    } else {
      hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    }

    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    const session = date.getHours() > 12 ? "PM" : "AM";

    return `${month} ${day}, ${date.getFullYear()} | ${hour}:${minute} ${session}`;
  };

  return (
    <article className="bg-light-1 rounded-xl py-3 sm:py-5 px-2 sm:px-5 flex flex-col gap-3 mb-8 shadow-md">
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <Link href={`/${author.username}`}>
            <Image
              src={author.image}
              alt={title}
              width={70}
              height={70}
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
          </Link>
          <div>
            <Link href={`/${author.username}`}>
              <p className="text-dark-1 font-semibold hover:underline text-sm md:text-base">
                {author.name}
              </p>
            </Link>
            <p className="text-xs text-dark-3">@{author.username}</p>
          </div>
        </div>

        <Popover>
          <div className="relative">
            <PopoverTrigger className="flex text-dark-2 hover:bg-light-2 rounded-full p-0.5">
              <MdMoreHoriz size={28} />
            </PopoverTrigger>

            <PopoverContent className="absolute right-0 w-[120px] flex flex-col gap-2 p-1.5">
              {currentUserId !== author.id && (
                <Link
                  href={`/report-showject/${showjectId}`}
                  className="text-dark-2 hover:bg-light-2 p-1 rounded text-sm font-medium">
                  Report
                </Link>
              )}

              {currentUserId === author.id && (
                <Link
                  href={`/edit-showject/${showjectId}`}
                  className="text-dark-2 hover:bg-light-2 p-1 rounded text-sm font-medium">
                  Edit
                </Link>
              )}
              {currentUserId === author.id && (
                <Link
                  href={`/delete-showject/${showjectId}`}
                  className="text-dark-2 hover:bg-light-2 p-1 rounded text-sm font-medium">
                  Delete
                </Link>
              )}
            </PopoverContent>
          </div>
        </Popover>
      </div>

      <Link href={`/showject/${showjectId}`}>
        <div className="bg-light-2 hover:bg-light-3 p-2 sm:p-4 rounded-md sm:rounded-xl">
          <Image
            src={image}
            alt={title || ""}
            width={800}
            height={400}
            className="w-full h-[220px] sm:h-[280px] md:h-[340px] object-contain rounded-lg bg-dark-4 mb-2"
          />

          <h2 className="text-base md:text-lg font-semibold text-dark-1">
            {title}
          </h2>

          <p className="text-xs md:text-sm text-dark-2 mb-3">{description}</p>

          <p className="text-xs text-dark-3">{converDateTime(createdAt)}</p>
        </div>
      </Link>

      <div className="flex items-center gap-5 px-3 pt-1 sm:pt-3">
        <p className="flex gap-2 items-center text-accent-2 font-medium">
          <FaHeart size={22} /> {loveCount.length || 0}
        </p>
        <p className="flex gap-2 items-center text-accent-1 font-medium">
          <FaCommentDots size={22} />
          {comments.length || 0}
        </p>
      </div>
    </article>
  );
};

export default memo(MainShowjectCard);

import Image from "next/image";

interface Props {
  _id: string;
  id: string;
  name: string;
  username: string;
  image: string;
  text: string;
  children: any;
  createdAt: any;
}

const CommentCard = ({
  _id,
  id,
  name,
  username,
  image,
  text,
  children,
  createdAt,
}: Props) => {
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
      hour = tempData > 9 ? tempData : "0" + tempData;
    } else {
      hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    }

    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    const session = date.getHours() > 12 ? "PM" : "AM";

    return `${month} ${day}, ${date.getFullYear()} | ${hour}:${minute} ${session}`;
  };

  return (
    <article className="flex items-center gap-2 mb-5">
      <Image
        src={image}
        alt={`${name}'s pic`}
        width={50}
        height={50}
        className="max-w-[44px] max-h-[44px] rounded-full object-cover border"
      />

      <div className="flex-1 ">
        <div className="bg-light-1 p-3 rounded-md ">
          <p className="text-dark-1 text-base font-semibold">{name}</p>

          <p className="text-sm text-dark-2">{text}</p>

          <hr className="my-2" />

          <p className="text-xs text-dark-4">{converDateTime(createdAt)}</p>
        </div>
      </div>
    </article>
  );
};

export default CommentCard;

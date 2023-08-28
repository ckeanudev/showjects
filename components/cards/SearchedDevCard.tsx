import Image from "next/image";
import Link from "next/link";

interface Props {
  userInfo: any;
}

const SearchedDevCard = ({ userInfo }: Props) => {
  return (
    <Link href={`/${userInfo.username}`}>
      <article className="flex items-center gap-3 mb-3 bg-light-1 py-3 p-4 rounded-md">
        <Image
          src={userInfo.image}
          alt={"user pic"}
          width={80}
          height={80}
          className="h-[50px] w-[50px] rounded-full object-cover border"
        />
        <div className="">
          <p className="font-semibold text-dark-1">{userInfo.name}</p>
          <p className="text-sm text-dark-3">@{userInfo.username}</p>
        </div>
      </article>
    </Link>
  );
};

export default SearchedDevCard;

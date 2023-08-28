import Image from "next/image";
import Link from "next/link";

interface Props {
  dataUser: any;
}

const RightBarCard = ({ dataUser }: Props) => {
  return (
    <Link href={`/${dataUser.username}`}>
      <div className="flex items-center gap-2 bg-light-2 p-2 rounded-md mb-3">
        <Image
          src={dataUser.image || ""}
          alt="user pic"
          width={40}
          height={40}
          className="w-[40px] h-[40px] rounded-full object-cover border "
        />

        <div className="">
          <p className="text-sm font-semibold text-dark-1">{dataUser.name}</p>
          <p className="text-xs text-dark-3">@{dataUser.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default RightBarCard;

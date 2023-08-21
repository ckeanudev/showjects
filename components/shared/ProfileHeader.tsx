import Image from "next/image";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";

interface Props {
  userInfo: {
    _id: string;
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
    job: string;
    location: string;
    personalWebsite: string;
    github: string;
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
    showjectsCollection: any;
    respectCount: string[];
    respectDevs: string[];
    onboarded: boolean;
  };
}

const ProfileHeader = ({ userInfo }: Props) => {
  const {
    _id,
    id,
    username,
    name,
    image,
    bio,
    job,
    location,
    personalWebsite,
    github,
    linkedIn,
    facebook,
    twitter,
    instagram,
    showjectsCollection,
    respectCount,
    respectDevs,
    onboarded,
  } = userInfo;

  return (
    <div className="flex items-center gap-8">
      <Image
        src={image}
        alt={`${name}'s profile pic`}
        width={100}
        height={100}
        className="w-[100px] h-[100px] rounded-full object-cover"
      />
      <div>
        <p className="text-2xl font-semibold text-dark-1 ">{name}</p>
        <p className="text-sm text-dark-3">@{username}</p>
        <div className="flex gap-4 items-center mt-2">
          <p className="">{showjectsCollection.lenght || 0} showjects</p>
          <p className="">{showjectsCollection.lenght || 0} followers</p>
          <p className="">{showjectsCollection.lenght || 0} following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

import Image from "next/image";
import Link from "next/link";
import {
  BsFacebook,
  BsGithub,
  BsGlobe,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import FollowButton from "./FollowButton";
import TempComponent from "./TempComponent";

interface Props {
  currentUserDb: any;
  userInfo: any;
}

const ProfileHeader = ({ currentUserDb, userInfo }: Props) => {
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
    followers,
    following,
    onboarded,
  } = userInfo;

  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-start gap-8">
        <div className="relative">
          <Image
            src={image}
            alt={`${name}'s profile pic`}
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded-full object-cover border"
          />

          {currentUserDb.id == userInfo.id && (
            <Link href="/edit-profile">
              <p className="absolute flex items-center justify-center bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] bg-accent-1 hover:bg-accent-1_hover font-medium text-light-1 text-sm w-[100px] p-1 rounded-md">
                Edit Profile
              </p>
            </Link>
          )}

          {currentUserDb.id !== userInfo.id && (
            <FollowButton
              currentUserDbId={currentUserDb._id}
              userPageDbId={userInfo._id}
              userFollowers={userInfo.followers}
            />
          )}
        </div>

        <div>
          <p className="text-2xl font-semibold text-dark-1 ">{name}</p>
          <p className="text-sm text-dark-3">@{username}</p>
          <div className="flex gap-5 items-center mt-2">
            <p className="font-medium text-dark-2">
              {showjectsCollection.length || 0}{" "}
              {showjectsCollection.length === 0 ||
              showjectsCollection.length === 1
                ? `showject`
                : `showjects`}
            </p>
            <p className="font-medium text-dark-2">
              {followers.length || 0}{" "}
              {followers.length === 0 || followers.length === 1
                ? `follower`
                : `followers`}
            </p>
            <p className="font-medium text-dark-2">
              {following.length || 0} following
            </p>
          </div>

          <div className="flex gap-4 items-center mt-4">
            {personalWebsite ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsGlobe size={20} />
              </a>
            ) : (
              ""
            )}

            {github ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsGithub size={20} />
              </a>
            ) : (
              ""
            )}

            {linkedIn ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsLinkedin size={20} />
              </a>
            ) : (
              ""
            )}

            {facebook ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsFacebook size={20} />
              </a>
            ) : (
              ""
            )}

            {instagram ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsInstagram size={20} />
              </a>
            ) : (
              ""
            )}

            {twitter ? (
              <a
                href={personalWebsite}
                className="text-dark-3 hover:text-dark-2"
                target="_blank"
                rel="noopener noreferrer">
                <BsTwitter size={20} />
              </a>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center flex-warp gap-1">
            <p className="text-xs mt-5 font-semibold text-dark-3 bg-light-3 py-0.5 px-1.5 rounded">
              {job}
            </p>
            <p className="text-xs mt-5 font-semibold text-dark-3 bg-light-3 py-0.5 px-1.5 rounded">
              {location}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="px-2 rounded-md">
        <p className="text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

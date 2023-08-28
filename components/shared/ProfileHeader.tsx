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
import { MdLocationPin, MdWork } from "react-icons/md";

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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <Image
            src={image}
            alt={`${name}'s profile pic`}
            width={100}
            height={100}
            className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-full object-cover border"
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
          <p className="text-2xl font-semibold text-dark-1 text-center md:text-left">
            {name}
          </p>
          <p className="text-sm text-dark-3 text-center md:text-left">
            @{username}
          </p>
          <div className="flex gap-5 items-center mt-2 justify-center md:justify-start ">
            <p className="text-sm lg:text-base font-medium text-dark-2">
              {showjectsCollection.length || 0}{" "}
              {showjectsCollection.length === 0 ||
              showjectsCollection.length === 1
                ? `showject`
                : `showjects`}
            </p>
            <p className="text-sm lg:text-base font-medium text-dark-2">
              {followers.length || 0}{" "}
              {followers.length === 0 || followers.length === 1
                ? `follower`
                : `followers`}
            </p>
            <p className="text-sm lg:text-base font-medium text-dark-2">
              {following.length || 0} following
            </p>
          </div>

          <div className="flex gap-4 items-center mt-4 justify-center md:justify-start">
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

          <div className="flex items-center justify-center md:justify-start flex-warp gap-1">
            {job && (
              <p className="flex items-center gap-1 text-xs mt-5 font-semibold text-dark-3 bg-light-3 py-0.5 px-1.5 rounded">
                <MdWork size={14} /> {job}
              </p>
            )}
            {location && (
              <p className="flex items-center gap-1 text-xs mt-5 font-semibold text-dark-3 bg-light-3 py-0.5 px-1.5 rounded">
                <MdLocationPin size={14} /> {location}
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="px-2 rounded-md">
        <p className="text-sm text-center md:text-left text-dark-2">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

import Link from "next/link";
import MainShowjectCard from "../cards/MainShowjectCard";

interface Props {
  currentUserId: string;
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
    followers: string[];
    following: string[];
    onboarded: boolean;
  };
}

const ProfileCollection = ({ currentUserId, userInfo }: Props) => {
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
    <div className="flex flex-col mt-5">
      <h2 className=""></h2>

      {showjectsCollection.length > 0 ? (
        showjectsCollection.map((data: any) => {
          return (
            <MainShowjectCard
              key={data._id}
              showjectId={data._id}
              image={data.showjectImg}
              title={data.title}
              description={data.description}
              author={data.author}
              sourceCodeUrl={data.sourceCodeUrl}
              liveUrl={data.liveUrl}
              comments={data.comments}
              loveCount={data.loveCount}
              createdAt={data.createdAt}
              currentUserId={currentUserId}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center">
          {currentUserId === id ? (
            <Link href="/create-showject">
              <button className="bg-accent-2 hover:bg-accent-2_hover text-light-1 py-1.5 px-3 font-medium rounded-md">
                Create your first showject
              </button>
            </Link>
          ) : (
            <p className="text-dark-1">No showjects yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCollection;

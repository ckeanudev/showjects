interface Props {
  userInfo: {
    _id: string;
    id: string;
    username: string;
    name: string;
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
  return <div className="">ProfileHeader</div>;
};

export default ProfileHeader;

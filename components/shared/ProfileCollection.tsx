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

const ProfileCollection = ({ userInfo }: Props) => {
  return <div>ProfileCollection</div>;
};

export default ProfileCollection;

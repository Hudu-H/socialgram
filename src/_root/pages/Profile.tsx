import { Link, useParams } from "react-router-dom";

// internal imports
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";

type StatBlockProps = {
  value: string | number;
  label: string;
};

// stats for followers & following
const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { user } = useUserContext();
  // get id from useParams
  const { id } = useParams();

  const { data: currentUser } = useGetUserById(id || "");

  // if !currentUser
  if (!currentUser)
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col flex-1 max-xl:items-center gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile_placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />
          <div className="flex flex-1 flex-col justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 xl:text-left text-center">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex items-center gap-8 mt-10 justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={10} label="Followers" />
              <StatBlock value={8} label="Following" />
            </div>

            <p className="text-center small-medium md:base-medium xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile${currentUser.$id}`}
                className={`h-12 px-5 bg-dark-4 flex-center text-light-1 gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  height={24}
                  width={24}
                />
                <p
                  className="flex
                 small-medium whitespace-nowrap"
                >
                  Edit Profile
                </p>
              </Link>
            </div>

            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

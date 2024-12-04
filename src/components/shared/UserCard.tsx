import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};
const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="h-14 w-14 rounded-full"
      />

      <div className="flex-center flex-col gap-1">
        <p className="text-center base-medium text-light-1 line-clamp-1">
          {user.name}
        </p>
        <p className="text-center small-regular text-light-3 line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;

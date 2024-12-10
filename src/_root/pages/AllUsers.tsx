// internal imports
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  const navigate = useNavigate();

  if (isErrorCreators) {
    toast({ title: "User not found" });
    return;
  }

  return (
    <div className="common-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

import { Models } from "appwrite";
// internal imports
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SavedPost = () => {
  const { data: currnetUser } = useGetCurrentUser();
  const navigate = useNavigate();

  // define saved posts
  const savedPosts = currnetUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currnetUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
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
      <div className="flex w-full gap-2 max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          alt="saved images"
          className="invert-white"
          height={36}
          width={36}
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {!currnetUser ? (
        <Loader />
      ) : (
        <ul className="flex justify-center w-full gap-9 max-w-5xl">
          {savedPosts.length === 0 ? (
            <p className="text-light-4">No posts available</p>
          ) : (
            <GridPostList posts={savedPosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default SavedPost;

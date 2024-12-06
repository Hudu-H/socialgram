import { Models } from "appwrite";
// internal imports
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const SavedPost = () => {
  const { data: currnetUser } = useGetCurrentUser();

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

import { Models } from "appwrite";
import { Link } from "react-router-dom";

// internal imports
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type GridPostsListProps = {
  posts: Models.Document[];
  showStats?: boolean;
  showUser?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostsListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex flex-1 justify-start items-center gap-2 ">
                <img
                  src={
                    (post.creator && post.creator.imageUrl) ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-9 h-9"
                />
                <p className="line-clamp-1">
                  {post.creator && post.creator.name}
                </p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;

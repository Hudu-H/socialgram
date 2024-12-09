import { useUserContext } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
// import CreateComment from "@/_root/pages/CreateComment";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assest/icons/profile-placeholder.svg"
              }
              alt="creator of post"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-medium">
              {post.creator.name}
            </p>
            <div className="flex-center text-light-3 gap-2">
              <p className="subtle-semibold lg:small-regular">
                {formatDate(post.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src="/assets/icons/edit.svg"
            alt="edit image"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex mt-2 gap-1">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="small-regular text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="posted image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
      {/* <CreateComment postId={post.$id} /> */}
    </div>
  );
};

export default PostCard;

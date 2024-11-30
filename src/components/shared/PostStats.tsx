import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex items-center justify-between z-20">
      <div className="flex mr-5 gap-2">
        <img
          src="/assets/icons/like.svg"
          alt="like post button"
          height={20}
          width={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{0}</p>
      </div>

      <div className="flex gap-2">
        <img
          src="/assets/icons/save.svg"
          alt="like post button"
          height={20}
          width={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;

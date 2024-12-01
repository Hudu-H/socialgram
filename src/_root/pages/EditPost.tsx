import { useParams } from "react-router-dom";

//internal imports
import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";

const editPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  // return loader is pending
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start gap-3 w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add post"
            height={36}
            width={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {/* pass in update action to populate the forms*/}
        <PostForm post={post} action="update" />
      </div>
    </div>
  );
};

export default editPost;

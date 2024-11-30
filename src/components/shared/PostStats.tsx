import React, { useState } from "react";
import { Models } from "appwrite";

// internal imports
import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  // know number of likes on a post
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // import hooks from react queries and mutations
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  /// know current user
  const { data: currentUser } = useUserContext();

  // handle like post
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    // check if current user has liked post
    const hasLiked = newLikes.includes(userId);

    // remove like if current user has liked post
    hasLiked
      ? (newLikes = newLikes.filter((id) => id !== userId))
      : newLikes.push(userId);

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  // handle save post
  const handleSavePost = () => {};

  return (
    <div className="flex items-center justify-between z-20">
      <div className="flex mr-5 gap-2">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like post button"
          height={20}
          width={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="like post button"
          height={20}
          width={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;

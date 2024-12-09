// import { useState } from "react";
// // import { useUserContext } from "@/context/AuthContext";
// // import {
// //   useCreateComment,
// //   useDeleteComment,
// //   useGetComments,
// // } from "@/lib/react-query/queriesAndMutations";
// import { IComment } from "@/types";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";

// const CreateComment = ({ postId }: { postId: string }) => {
//   const [newComment, setNewComment] = useState("");
//   // const { data: comments = [] } = useGetComments(postId);
//   // const createComment = useCreateComment();
//   // const deleteComment = useDeleteComment();
//   // const { user } = useUserContext();

//   if (!postId) {
//     console.error("Post ID is required for comments");
//     return null; // return null if postId is not available
//   }

//   const handleAddComment = () => {
//     if (newComment.trim() !== "" && user) {
//       createComment.mutate(
//         { postId, newComment: { userId: user.id, comments: newComment } },
//         {
//           onSuccess: () => {
//             setNewComment(""); // Clear the input field on success
//           },
//           onError: (error) => {
//             console.error("Error adding comment:", error);
//             // Optional: Display user-friendly error message or toast here
//           },
//         }
//       );
//     }
//   };

//   const handleDeleteComment = (updatedComments: string[]) => {
//     if (!user) return; // If no user, prevent deletion

//     deleteComment.mutate(
//       { postId, updatedComments },
//       {
//         onSuccess: () => {
//           toast({
//             title: "Comment deleted successfully",
//           });
//         },
//         onError: (error: any) => {
//           console.log("Error deleting comment:", error);
//         },
//       }
//     );
//   };

//   return (
//     <div className="small-medium lg:base-medium py-3">
//       <ul className="comment-section__list">
//         {comments.map((comment: IComment) => (
//           <li key={comment.id} className="flex mt-2 gap-1">
//             <p className="comment-section__content">{comments.content}</p>
//             {user && user.id === comment.userId && (
//               <button
//                 className="comment-section__delete-btn"
//                 onClick={() => handleDeleteComment(comment.id)}
//                 disabled={deleteComment.isPending}
//                 aria-label="Delete Comment"
//               >
//                 {deleteComment.isPending ? "Deleting..." : "Delete"}
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className="flex mt-2 gap-1">
//         <Textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           className="shad-textarea custom-scrollbar"
//           aria-label="Add a comment"
//           id="comment-textarea"
//         />
//         <Button
//           onClick={handleAddComment}
//           className="shad-button_primary px-5"
//           disabled={createComment.isPending || !newComment.trim()}
//           aria-label="Post your comment"
//         >
//           {createComment.isPending ? "Posting..." : "Post"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CreateComment;

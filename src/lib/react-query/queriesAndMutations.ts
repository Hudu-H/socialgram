import { INewPost, INewUser } from "@/types";
import {
    useQueryClient,
    useQuery,useMutation,
    useInfiniteQuery
} from "@tanstack/react-query";
import { createPost, createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";


// create user account query
export const useCreateUserAccount = () => {
    return useMutation({
    mutationFn: (user: INewUser) => 
        createUserAccount(user)
    })
}

// SIGN IN USER
export const useSignInAccount = () => {
    return useMutation({
    mutationFn: (user: {
        email: string;
        password: string;
    }) => 
        signInAccount(user)
    })
}

// SIGN OUT USER
export const useSignOutAccount = () => {
    return useMutation({
    mutationFn:  signOutAccount
    })
}


/*** POST QUERIES ***/

// CREATE POST
export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
    mutationFn:  (post: INewPost) => createPost(post),
    onSuccess: () => {queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    }) }
    })
}


// GET POTS
export const useGetPosts = () => {}


// SEARCH POSTS
export const useSearchPosts = () => {}


// GET RECENT POSTS
export const useGetRecentPosts = () => {}


// GET POST BY ID
export const useGetPostById = () => {}


// GET USER POSTS
export const useGetUserPosts = () => {}


// UPDATE POST
export const useUpdatePost = () => {}

// DELETE POST
export const useDeletePost = () => {}


// LIKE / UNLIKE POST
export const useLikePosts = () => {}


// SAVE POST
export const useSavePost = () => {}


// DELETE SAVED POST
export const useDeleteSavedPost = () => {}


/******* USR QUERIES ******/

// GET CURRENT USER
export const useGetCurrentUser = () => {}


// GET USERS
export const useGetUsers = () => {}


// GET USER BY ID
export const useGetUserById = () => {}



// UPDATE USER
export const useUpdateUser = () => {}


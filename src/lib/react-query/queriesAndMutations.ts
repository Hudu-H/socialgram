import { INewPost, INewUser } from "@/types";
import {
    useQueryClient,
    useQuery,useMutation,
    useInfiniteQuery
} from "@tanstack/react-query";
import { createPost, createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";


// create user account mutation hook for user activity changelog purposes
export const useCreateUserAccount = () => {
    return useMutation({
    mutationFn: (user: INewUser) => 
        createUserAccount(user)
    })
}

// sign in user mutation hook
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

// CREATE POST
export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
    mutationFn:  (post: INewPost) => createPost(post),
    onSuccess: queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    })
    })
}
import { INewUser } from "@/types";
import {
    useQueryClient,
    useQuery,useMutation,
    useInfiniteQuery
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";


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
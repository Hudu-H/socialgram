import { INewUser } from "@/types";
import {
    useQueryClient,
    useQuery,useMutation,
    useInfiniteQuery
} from "@tanstack/react-query";
import { createUserAccount } from "../appwrite/api";


// create user account mutation hook for user activity changelog purposes
export const useCreateUserAccountMutation = () => {
    return useMutation({
    mutationFn: (user: INewUser) => 
        createUserAccount(user)
    })
}
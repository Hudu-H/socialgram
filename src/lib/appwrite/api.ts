import { ID } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";

// SIGN UP NEW USER FUNCTIONALISTY
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: user.name,
            email: user.email,
            imageUrl: avatarUrl,
            username: user.username,
        });

        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    }

}
// SAVE NEW USER TO DB
export async function saveUserToDB(user: {
    accountId: string;
    name: string;
    email: string;
    username?: string;
    imageUrl: URL | string; // FIXME 

}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}
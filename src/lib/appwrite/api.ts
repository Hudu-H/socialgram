import { ID,Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";

// CREATE USER ACCOUNT
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
            username: user.username,
            imageUrl: avatarUrl, 
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
    imageUrl: URL | string;

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

// SIGN IN USER
export async function signInAccount(user: {
    email: string;
    password: string;
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}



 // CHECK AUTH CURRENT USER 
 export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        // check if there is no current account
        if(!currentAccount) throw new Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
 }

 // SIGN OUT ACCOUNT
  export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
  }


  // CREATE POST
  export async function createPost(post: INewPost) {
    try {

        // upload file to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        // get file url
        const fileUrl =  getFilePreview(uploadedFile.$id)
        if(!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // convert tags to array
        const tags = post.tags?.replace(/ /g, '').split(' , ') || [];


        // create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageId: uploadedFile.$id,
                imageUrl: fileUrl,
                location: post.location,
                tags: tags,
            }
        )
        if(!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }
        
            return newPost;
    } catch (error) {
        console.log(error);
    }
  }

  // UPLOAD FILE
  export async function uploadFile() {}



  // GET FILE PREVIEW
  export async function getFilePreview() {

  }

  // DELETE FILE
  export async function deleteFile() {}


  // GET POSTS BY ID
  export async function getPostById() {
    
  }
import { ID,ImageGravity,Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";

// CREATE USER 
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
    imageUrl: URL;

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


    // GET ACCOUNT
    export async function getAccount(){
        try {
            const currentAccount = await account.get();

            return currentAccount;
        } catch (error) {
            console.log("Error getting account");
        }
    }


 // CHECK AUTH CURRENT USER 
 export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if(!currentAccount) throw new Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log("Failed to get current user");
        return null;
    }
 }

 // SIGN OUT USER
  export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
  }


  /**** POSTS ****/

  // CREATE POST
  export async function createPost(post: INewPost) {
    try {

        // upload file to appwrite(storage)
        const uploadedFile = await uploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        // get file url
        const fileUrl =  getFilePreview(uploadedFile.$id)
        if(!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // convert tags into array
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
        console.log("Error creating post:", error);
    }
  }

  /***** FILE ****/

  // UPLOAD FILE
  export async function uploadFile( file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file,
        )

        return uploadedFile;
    } catch (error) {
        console.log("file upload failed:", error);
    }
  }



  // GET FILE PREVIEW/URL
  export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "center" as ImageGravity,
            100,
        );

        if(!fileUrl) throw Error("File not found");

        return fileUrl;
    } catch (error) {
        console.log("Error fetching file preview", error);
    }
  }

  // DELETE FILE
  export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);


        return { status: "ok"}
    } catch (error) {
        console.log(error);
    }
  }



/***** POSTS ****/

  // GET POSTS 
  export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm,)]
        );

        if(!posts) throw Error;


        return posts;
    } catch (error) {
        console.log("Post not found:", error);
    }
  }


  // GET INFINITE POSTS
  export async function getInfinitePosts({pageParam}: {pageParam: number}) {
      const queries: any[] = [Query.orderDesc('updatedAt'), Query.limit(10)];

      if (pageParam) {
          queries.push(Query.cursorAfter(pageParam.toString()))
      }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries,
        )

        if(!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
  }


  // GET POST BY ID
export async function getPostById(postId?: string) {
    if(!postId) throw Error;

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
        )

        if(!post) throw Error;


        return post;
    } catch (error) {
        console.log("can't find post")
    }
}


// UPDATE POST
export async function updatePost() {}


// DELETE POST
export async function deletePost() {}


// LIKE / UNLIKE POST
export async function likePost() {}


// SAVE POST 
export async function savePost() {}


// DELETE SAVED POST
export async function deleteSavedPost() {}


// GET USER'S POSTS

export async function getUserPosts() {}


// GET POPULAR POSTS / HIGHEST LIKE COUNT


/***** GET USERS ****/
export async function getUsers() {}




// GET USER BY ID
export async function getUserById() {}



// UPDATE USER

export async function updateUser() {}





import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
  } from "react-native-appwrite";
  


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.auro',
    projectId: '672fba6c000b97d5bd62',
    databaseId: '672fbd0a00260020d174',
    userCollectionId: '672fbd57002c13d3559f',
    videoCollectionId: '672fbd9c000689f4ae61',
    storageId: '672fc03600379394d466'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const creatUser = async (email, password, username) => {
    try {
      // Step 1: Create the account
      const newAccount = await account.create(
        ID.unique(), // Unique user ID
        email,
        password,
        username
      );
  
      if (!newAccount || !newAccount.$id) {
        throw new Error('Account creation failed');
      }
  
      // Step 2: Create avatar (optional step for visuals)
      const avatarUrl = avatars.getInitials(username);
  
      // Step 3: Store user in the database
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl,
        }
      );
  
      // Step 4: Sign in the user (no need to pass username here)
      await signIn(email, password); 
  
      return newUser; // Return the created user
    } catch (error) {
      console.error("Error in creatUser:", error);
      throw new Error(error.message || "An unknown error occurred.");
    }
  };
  

  export const signIn= async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const addPostToDatabase = async (postText) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      const postsRef = ref(database, `posts/${uid}`);
      await push(postsRef, { text: postText });
      console.log("Post added to Realtime Database!");
    } else {
      console.error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error adding post to Realtime Database:", error);
  }
};

export const getPostsFromDatabase = (callback) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      const postsRef = ref(database, `posts/${uid}`);
      onValue(postsRef, (snapshot) => {
        const posts = [];
        snapshot.forEach((childSnapshot) => {
          const { text } = childSnapshot.val();
          posts.push({ id: childSnapshot.key, text });
        });
        callback(posts);
      });
    } else {
      console.error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error getting posts from Realtime Database:", error);
    return [];
  }
};

export const updatePostInDatabase = async (postId, postText) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      const postRef = ref(database, `posts/${uid}/${postId}`);
      await update(postRef, { text: postText });
      console.log("Post updated successfully.");
    } else {
      console.error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error updating post in Realtime Database:", error);
  }
};

export const removePostFromDatabase = async (postId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      const postRef = ref(database, `posts/${uid}/${postId}`);
      await remove(postRef);
      console.log("Post removed from Realtime Database!");
    } else {
      console.error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error removing post from Realtime Database:", error);
  }
};

export const handleResetPassword = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully. Check your email.");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

import React, { useEffect, useState } from "react";
import {
  getPostsFromDatabase,
  removePostFromDatabase,
  updatePostInDatabase,
} from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import editIcon from "../../icon/pencil.svg"; // Замените на правильный путь к вашей иконке

import styles from "./PostsList.module.scss";

import Card from "../Card/Card";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedText, setEditedText] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserAuthenticated(true);
        getPostsFromDatabase(setPosts);
        setLoading(false);
      } else {
        setUserAuthenticated(false);
        setPosts([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRemovePost = async (postId) => {
    try {
      await removePostFromDatabase(postId);
      getPostsFromDatabase(setPosts);
    } catch (error) {
      console.error("Failed to remove post:", error);
    }
  };

  const handleEditPost = (postId, postText) => {
    setEditPostId(postId);
    setEditedText(postText);
  };

  const handleSaveEdit = async (postId) => {
    try {
      console.log(`Saving edited text: ${editedText} for post ${postId}`);
      await updatePostInDatabase(postId, editedText);
      getPostsFromDatabase(setPosts);
      setEditPostId(null);
      setEditedText("");
    } catch (error) {
      console.error("Failed to save edited text:", error);
    }
  };

  return (
    <div className={styles.list}>
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        userAuthenticated &&
        (posts.length === 0 ? (
          <h1>Add post here</h1>
        ) : (
          posts.map((post) => (
            <Card className={styles.card} key={post.id}>
              {editPostId === post.id ? (
                <>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSaveEdit(post.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{post.text}</p>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemovePost(post.id)}
                  >
                    -
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditPost(post.id, post.text)}
                  >
                    <img src={editIcon} alt="Edit" />
                  </button>
                </>
              )}
            </Card>
          ))
        ))
      )}
    </div>
  );
};

export default PostsList;

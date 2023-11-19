import React, { useEffect, useState } from "react";
import { getPostsFromDatabase, removePostFromDatabase } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import styles from "./PostsList.module.scss";

import Card from "../Card/Card";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to remove post:", error);
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
            <Card key={post.id}>
              {post.text}
              <button onClick={() => handleRemovePost(post.id)}>-</button>
            </Card>
          ))
        ))
      )}
    </div>
  );
};

export default PostsList;

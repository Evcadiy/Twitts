import React, { useState } from "react";
import Header from "../components/Header/Header";
import { addPostToDatabase } from "../firebase";

import styles from "./AddPost.module.scss";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  const handleAddPost = () => {
    addPostToDatabase(postText);
    setPostText("");
    navigate("/");
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Enter text 🠫</h1>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <button onClick={handleAddPost}>Add New Post</button>
      </div>
    </>
  );
};

export default AddPost;

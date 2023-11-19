import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: JSON.parse(localStorage.getItem("posts")) || [],
  reducers: {
    addPost: (state, action) => {
      const newState = [...state, action.payload];
      localStorage.setItem("posts", JSON.stringify(newState));
      return newState;
    },
    setPosts: (state, action) => {
      const newState = action.payload;
      localStorage.setItem("posts", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;

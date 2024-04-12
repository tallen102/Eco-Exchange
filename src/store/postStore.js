// Purpose: Create a store for posts
import { create } from "zustand";
const postStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  //deletePost:
  //setPosts:
}));

export default postStore;

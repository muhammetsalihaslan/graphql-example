import { posts } from "./data.js";

export const User = {
  posts: (parent) => posts.filter((post) => post.user_id === parent.id),
};

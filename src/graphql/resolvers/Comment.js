import { users, posts } from "../../data.js";

export const Comment = {
  post: (parent) => posts.find((post) => post.id === parent.post_id),
  user: (parent) => users.find((user) => user.id === parent.user_id),
};

import { users, comments } from "./data.js";

export const Post = {
  users: (parent) => users.find((user) => user.id === parent.user_id),
  comments: (parent) =>
    comments.filter((comment) => comment.post_id === parent.id),
};

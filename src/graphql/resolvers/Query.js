import { users, posts, comments } from "../../data.js";

export const Query = {
  //! users
  users: () => users,
  user: (args) => {
    const user = users.find((user) => user.id === args.id);
    if (!user) {
      return new Error("User not found");
    }
    return user;
  },

  //! posts
  posts: () => posts,
  post: (args) => posts.find((post) => post.id === args.id),

  //! comments
  comments: () => comments,
  comment: (args) => comments.find((comment) => comment.id === args.id),
};

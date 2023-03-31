import { nanoid } from "nanoid";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

export const Mutation = {
  //USER
  createUser: (_, { data }) => {
    const user = {
      id: nanoid(),
      ...data, //  fullname: data.fullName,  bu şekilde yazmanın farklı yolu ...data şeklinde yazmaktır
    };
    users.push(user);
    pubSub.publish("userCreated", { userCreated: user });
    return user;
  },

  updateUser: (parent, { id, data }) => {
    const user_index = users.findIndex((user) => user.id == id);

    if (user_index === -1) {
      throw new Error("User not found.");
    }

    // users[user_index].fullname = data.fullName;
    // users[user_index].age = data.age;

    const updated_user = (users[user_index] = {
      ...users[user_index],
      ...data,
    });
    pubSub.publish("userUpdated", { userUpdated: updated_user });

    return updated_user;
  },

  deleteUser: (parent, { id }) => {
    const delete_index = users.findIndex((user) => user.id === id);

    if (delete_index === -1) {
      throw new Error("User not found");
    }
    const delete_user = users[delete_index];
    users.splice(delete_index, 1);
    pubSub.publish("userDeleted", { userDeleted: delete_user });

    return delete_user;
  },

  deleteAllUsers: () => {
    const length = users.length;
    users.splice(0, length);
    return {
      count: length,
    };
  },

  //POST
  createPost: (parent, { data }) => {
    const post = {
      id: nanoid(),
      title: data.title,
      user_id: data.user_id,
    };
    posts.push(post);
    pubSub.publish("postCreated", { postCreated: post });
    pubSub.publish("postCount", { postCount: posts.length });
    return post;
  },

  updatePost: (parent, { id, data }) => {
    const post_index = posts.findIndex((post) => post.id === id);

    if (post_index === -1) {
      throw new Error("invalid post");
    }

    posts[post_index] = {
      ...posts[post_index],
      ...data,
    };
    pubSub.publish("postUpdated", { postUpdated: posts[post_index] });
    return posts[post_index];
  },

  deletePost: (parent, { id }) => {
    const post_index = posts.findIndex((post) => post.id === id);

    const deleted_post = posts[post_index];
    posts.splice(post_index, 1);
    pubSub.publish("postDeleted", { postDeleted: deleted_post });
    return deleted_post;
  },

  //COMMENT
  createComment: (parent, { data }) => {
    const comment = {
      id: nanoid(),
      text: data.text,
      user_id: data.user_id,
      post_id: data.post_id,
    };

    comments.push(comment);
    return comment;
  },

  updateComment: (parent, { id, data }) => {
    const comment_index = comments.findIndex((comment) => comment.id === id);

    if (comment_index === -1) {
      throw new Error("invalid comment");
    }

    comments[comment_index] = {
      ...comments[comment_index],
      ...data,
    }; //burada comment içerisinde değişmek isteneni bul daha sobra da data ile verdiğimiz değerleri içine ekle

    return comments[comment_index];
  },
};

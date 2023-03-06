// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { users, posts, comments } from "./data.js";
import { nanoid } from "nanoid";

const typeDefs = `#graphql
 type User{
    id:ID!
    fullname:String!
    age:Int!
    posts:[Post!]
 }

 input CreateUserInput {
  fullName:String!
  age:Int!
 }

 input UpdateUserInput {
    fullName:String!
    age:Int!
 }

 type Post {
    id:ID!
    title:String!
    user_id:ID!
    users:User!
    comments:[Comment!]!
 }

 input CreatePostInput {
  title:String!
  user_id:ID!
 }

 input UpdatePostInput {
  title:String
  user_id:ID
 }

 type Comment {
    id:ID!
    text:String!
    post:Post!
    user:User!

 }

 input CreateCommentInput {
  text:String!, 
  post_id:ID!, 
  user_id:ID!
 }

 input UpdateCommentInput {
  text:String
 }

 type DeleteAllOutput{
  count:Int!
 }

 type Query{
    users:[User!]!
    user(id:ID!):User!
    posts:[Post!]!
    post(id:ID!):Post!
    comments:[Comment!]!
    comment(id:ID!):Comment!
 }

 type Mutation{
  #user
  createUser(data:CreateUserInput!):User!  
  updateUser( id:ID!, data:UpdateUserInput! ):User!
  deleteUser(id:ID!):User! 
  deleteAllUsers:DeleteAllOutput!
  # Post
  createPost(data:CreatePostInput!):Post!
  updatePost(id:ID!, data:UpdatePostInput! ):Post!
  deletePost(id:ID!): Post! 

  #Comment
  createComment(data:CreateCommentInput!):Comment!
  updateComment(id:ID!, data:UpdateCommentInput! ):Comment!
 }
`;

const resolvers = {
  Mutation: {
    //USER
    createUser: (parent, { data }) => {
      const user = {
        id: nanoid(),
        ...data, //  fullname: data.fullName,  bu şekilde yazmanın farklı yolu ...data şeklinde yazmaktır
      };
      users.push(user);
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

      return updated_user;
    },

    deleteUser: (parent, { id }) => {
      const delete_index = users.findIndex((user) => user.id === id);

      if (delete_index === -1) {
        throw new Error("User not found");
      }
      const delete_user = users[delete_index];
      users.splice(delete_index, 1);

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

      return posts[post_index];
    },

    deletePost: (parent, { id }) => {
      const post_index = posts.findIndex((post) => post.id === id);

      const deleted_post = posts[post_index];
      posts.splice(post_index, 1);

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
  },
  Query: {
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
  },

  User: {
    posts: (parent) => posts.filter((post) => post.user_id === parent.id),
  },

  Post: {
    users: (parent) => users.find((user) => user.id === parent.user_id),
    comments: (parent) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },

  Comment: {
    post: (parent) => posts.find((post) => post.id === parent.post_id),
    user: (parent) => users.find((user) => user.id === parent.user_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 2000 },
});

console.log(`🚀  Server ready at: ${url}`);

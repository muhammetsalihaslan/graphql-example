import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { users, posts, comments } from "./data.js";
import { nanoid } from "nanoid";

const typeDefs = `#graphql
 type User{
    id:ID!
    fullname:String!
    posts:[Post!]
 }

 input CreateUserInput {
  fullName:String!
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

 type Query{
    users:[User!]!
    user(id:ID!):User!
    posts:[Post!]!
    post(id:ID!):Post!
    comments:[Comment!]!
    comment(id:ID!):Comment!
 }

 type Mutation{
  createUser(data:CreateUserInput!):User!
  createPost(data:CreatePostInput!):Post!
  createComment(data:CreateCommentInput!):Comment!
 }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, { data }) => {
      const user = {
        id: nanoid(),
        ...data, //  fullname: data.fullName,  bu şekilde yazmanın farklı yolu ...data şeklinde yazmaktır
      };
      users.push(user);
      return user;
    },
    createPost: (parent, { data }) => {
      const post = {
        id: nanoid(),
        title: data.title,
        user_id: data.user_id,
      };
      posts.push(post);
      return post;
    },
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

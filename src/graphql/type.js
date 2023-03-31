export const typeDef = `#graphql
type User {
  id: ID!
  fullname: String!
  age: Int!
  posts: [Post!]
}
input CreateUserInput {
  fullname: String!
  age: Int!
}
input UpdateUserInput {
  fullname: String!
  age: Int!
}
type Post {
  id: ID!
  title: String!
  user_id: ID!
  users: User!
  comments: [Comment!]!
}
input CreatePostInput {
  title: String!
  user_id: ID!
}
input UpdatePostInput {
  title: String
  user_id: ID
}
type Comment {
  id: ID!
  text: String!
  post: Post!
  user: User!
}
input CreateCommentInput {
  text: String!
  post_id: ID!
  user_id: ID!
}
input UpdateCommentInput {
  text: String
}
type DeleteAllOutput {
  count: Int!
}
type Query {
  users: [User!]!
  user(id: ID!): User!
  posts: [Post!]!
  post(id: ID!): Post!
  comments: [Comment!]!
  comment(id: ID!): Comment!
}
type Mutation {
  #user
  createUser(data: CreateUserInput!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
  deleteAllUsers: DeleteAllOutput!
  # Post
  createPost(data: CreatePostInput!): Post!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  deletePost(id: ID!): Post!
  #Comment
  createComment(data: CreateCommentInput!): Comment!
  updateComment(id: ID!, data: UpdateCommentInput!): Comment!
}
type Subscription {
  userCreated: User!
  userUpdated: User!
  userDeleted: User!
  postCreated(user_id: ID): Post
  postUpdated: Post!
  postDeleted: Post!
  postCount: Int!
  commentCreated(post_id: ID): Comment!
}
`;

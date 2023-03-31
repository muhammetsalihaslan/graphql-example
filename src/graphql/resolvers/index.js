import Query from "./Query";
import Mutation from "./Mutation";
import Comment from "./Comment";
import Post from "./Post";
import Subscription from "./Subscription";
import User from "./User";

export const Resolvers = {
  Subscription: Subscription,
  Mutation: Mutation,
  Query: Query,
  User: User,
  Post: Post,
  Comment: Comment,
};

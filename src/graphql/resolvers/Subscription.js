import { PubSub, withFilter } from "graphql-subscriptions";

const pubSub = new PubSub();

export const Subscription = {
  userCreated: {
    subscribe: () => pubSub.asyncIterator(["userCreated"]),
  },
  userUpdated: {
    subscribe: () => pubSub.asyncIterator("userUpdated"),
  },
  userDeleted: {
    subscribe: () => pubSub.asyncIterator(["userDeleted"]),
  },

  postCreated: {
    subscribe: withFilter(
      () => pubSub.asyncIterator(["postCreated"]),
      (payload, variables) => {
        return variables.user_id
          ? payload.postCreated.user_id === variables.user_id
          : true;
      }
    ),
  },
  postUpdated: {
    subscribe: () => pubSub.asyncIterator(["postUpdated"]),
  },
  postDeleted: {
    subscribe: () => pubSub.asyncIterator(["postDeleted"]),
  },
  postCount: {
    subscribe: () => {
      setTimeout(() => {
        pubSub.publish("postCount", { postCount: posts.length });
      });
      return pubSub.asyncIterator(["postCount"]);
    },
  },

  commentCreated: {
    subscribe: withFilter(
      () => pubSub.asyncIterator(["commentCreated"]),
      (payload, variables) => {
        return variables.post_id
          ? payload.commentCreated.post_id === variables.post_id
          : true;
      }
    ),
  },
};

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import bodyParser from "body-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PubSub, withFilter } from "graphql-subscriptions";
import { createServer } from "http";
import { users, posts, comments } from "./data.js";
import cors from "cors";
import { typeDef } from "./graphql/type.js";
import { Resolvers } from "./graphql/resolvers/index.js";

const schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: Resolvers,
});
const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const ServerCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await ServerCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

const PORT = 2000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});

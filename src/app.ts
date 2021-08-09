import express from "express";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";

import { createResolvers } from "./graph";

async function startServer() {
  const buffer = readFileSync("./schema.graphql");
  const schema = buildSchema(buffer.toString("utf-8"));
  const resolvers = await createResolvers();
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true,
    })
  );

  app.listen(3000, () => {
    console.log(`GraphiQL: http://localhost:3000/graphql`);
  });
}

startServer();

import * as path from "path";

import QueryService from "./app/query_service";
import NodeGitService from "./infra/git_service";
import Server, {
  buildFastify,
  registerGraphqlRouter,
  registerNextjsRouter
} from "./interfaces";
import resolvers from "./interfaces/resolvers";

export const main = async () => {
  const fastify = await buildFastify();

  const schemaPath = path.join(
    __dirname,
    "interfaces",
    "schema",
    "index.graphql"
  );
  const context = {
    queryService: new QueryService(new NodeGitService())
  };

  registerGraphqlRouter(fastify, schemaPath, resolvers, context);

  const dev = process.env.NODE_ENV !== "production";
  await registerNextjsRouter(fastify, dev);

  const server = new Server(fastify);
  server.start();
};

main();

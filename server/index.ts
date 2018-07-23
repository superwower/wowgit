import * as path from "path";

import Server, {
  buildFastify,
  registerNextjsRouter,
  registerGraphqlRouter
} from "./interfaces";
import resolvers from "./interfaces/resolvers";
import StatusService from "./app/status";
import NodeGitService from "./infra/git_service";

export const main = async () => {
  const fastify = await buildFastify();

  const schemaPath = path.join(
    __dirname,
    "interfaces",
    "schema",
    "index.graphql"
  );
  const context = {
    statusService: new StatusService(new NodeGitService())
  };

  registerGraphqlRouter(fastify, schemaPath, resolvers, context);

  const dev = process.env.NODE_ENV !== "production";
  await registerNextjsRouter(fastify, dev);

  const server = new Server(fastify);
  server.start();
};

main();

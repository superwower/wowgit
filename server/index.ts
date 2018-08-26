import * as path from "path";

import RemoteService from "./app/remote";
import StatusService from "./app/status";
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
  const nodeGitService = new NodeGitService();
  const context = {
    remoteService: new RemoteService(nodeGitService),
    statusService: new StatusService(nodeGitService)
  };

  registerGraphqlRouter(fastify, schemaPath, resolvers, context);

  const dev = process.env.NODE_ENV !== "production";
  await registerNextjsRouter(fastify, dev);

  const server = new Server(fastify);
  server.start();
};

main();

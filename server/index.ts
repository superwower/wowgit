import * as path from "path";

import Server, { buildFastify } from "./interfaces";
import resolvers from "./interfaces/resolvers";

const main = async () => {
  const schemaPath = path.join(
    __dirname,
    "interfaces",
    "schema",
    "index.graphql"
  );
  const dev = process.env.NODE_ENV !== "production";
  const app = await buildFastify(schemaPath, resolvers, dev);
  const server = new Server(app);
  server.start();
};

main();

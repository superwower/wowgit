import * as path from "path";

import { Server } from "./interfaces";

const serverOptions = { logger: true };
const schemaPath = path.join(
  __dirname,
  "interfaces",
  "schema",
  "index.graphql"
);
const address = "0.0.0.0";
const port = 3000;

const server = new Server(serverOptions, address, port, schemaPath);
server.start();

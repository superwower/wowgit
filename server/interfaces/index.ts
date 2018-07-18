import * as Fastify from "fastify";
import * as Next from "next";
import { registerRoutes } from "./router";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

const dev = process.env.NODE_ENV !== "production";
const next = Next({ dev });

export class Server {
  private options: Fastify.ServerOptions;
  private address: string;
  private port: number;
  private schemaPath: string;
  constructor(
    serverOptions = { logger: true },
    address = "0.0.0.0",
    port = 3000,
    schemaPath: string
  ) {
    this.options = serverOptions;
    this.port = port;
    this.address = address;
    this.schemaPath = schemaPath;
  }
  public createGraphqlSchema() {
    const typeDefs = importSchema(this.schemaPath);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    return schema;
  }
  public async start() {
    const fastify = Fastify(this.options);
    await next.prepare();
    registerRoutes(fastify, next, this.createGraphqlSchema());
    fastify.listen(this.port, this.address, (err, address) => {
      if (err) {
        throw err;
      }
    });
  }
}

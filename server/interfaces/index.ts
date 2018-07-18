import * as Fastify from "fastify";
import * as Next from "next";
import { registerRoutes } from "./router";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";

const dev = process.env.NODE_ENV !== "production";
const next = Next({ dev });

export class Server {
  private options: Fastify.ServerOptions;
  private address: string;
  private port: number;
  constructor(options = { logger: true }, address = "0.0.0.0", port = 3000) {
    this.options = options;
    this.port = port;
    this.address = address;
  }
  public createGraphqlSchema() {
    const typeDefs = importSchema(
      path.join(__dirname, "schema", "index.graphql")
    );
    const resolvers = {};
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

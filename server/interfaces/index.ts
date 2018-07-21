import * as http from "http";
import * as Fastify from "fastify";
import { parse } from "url";
import * as Next from "next";
import { importSchema } from "graphql-import";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { graphiqlFastify, graphqlFastify } from "fastify-graphql";

import resolvers from "./resolvers";

export const buildGraphqlSchema = (
  schemaPath: string,
  resolvers: IResolvers[]
) => {
  const typeDefs = importSchema(schemaPath);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return schema;
};

export const buildFastify = async (
  schemaPath: string,
  resolvers: IResolvers[],
  dev: boolean = false,
  options: Fastify.ServerOptions = { logger: true }
): Promise<Fastify.FastifyInstance> => {
  const fastify = Fastify(options);

  // graphql routes
  const graphqlSchema = buildGraphqlSchema(schemaPath, resolvers);
  fastify.register(graphqlFastify, {
    prefix: "/graphql",
    graphql: {
      schema: graphqlSchema
    }
  });
  fastify.register(graphiqlFastify, {
    prefix: "/graphiql",
    graphiql: {
      endpointURL: "/graphql"
    }
  });

  // next.js rotes
  const nextApp = Next({ dev });
  await nextApp.prepare();
  const nextHandler = nextApp.getRequestHandler();
  // TODO: cast fastify to any until type definition for `all` is added
  (<any>fastify).all(
    "/*",
    (
      req: Fastify.FastifyRequest<http.IncomingMessage>,
      res: Fastify.FastifyReply<http.ServerResponse>
    ) => {
      const parsedUrl = parse(req.req.url, true);
      nextHandler(req.req, res.res, parsedUrl);
    }
  );
  return fastify;
};

export default class Server {
  private app: Fastify.FastifyInstance;
  private address: string;
  private port: number;
  constructor(
    app: Fastify.FastifyInstance,
    address: string = "0.0.0.0",
    port: number = 3000
  ) {
    this.app = app;
    this.address = address;
    this.port = port;
  }
  public async start() {
    this.app.listen(this.port, this.address, (err, address) => {
      if (err) {
        throw err;
      }
    });
  }
}

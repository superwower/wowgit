import * as Fastify from "fastify";
import { graphiqlFastify, graphqlFastify } from "fastify-graphql";
import { importSchema } from "graphql-import";
import { IResolvers, makeExecutableSchema } from "graphql-tools";
import * as http from "http";
import * as Next from "next";
import { parse } from "url";

export const buildGraphqlSchema = (
  schemaPath: string,
  resolvers: IResolvers[]
) => {
  const typeDefs = importSchema(schemaPath);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return schema;
};

export const registerGraphqlRouter = (
  fastify: Fastify.FastifyInstance,
  schemaPath: string,
  resolvers: IResolvers[],
  context?: { [key: string]: any },
  graphqlPath: string = "/graphql",
  graphiqlPath: string = "/graphiql"
) => {
  // graphql routes
  const graphqlSchema = buildGraphqlSchema(schemaPath, resolvers);
  fastify.register(graphqlFastify, {
    graphql: {
      context,
      schema: graphqlSchema
    },
    prefix: graphqlPath
  });
  fastify.register(graphiqlFastify, {
    graphiql: {
      endpointURL: graphqlPath
    },
    prefix: graphiqlPath
  });
};

export const registerNextjsRouter = async (
  fastify: Fastify.FastifyInstance,
  dev = true,
  path = "/*"
) => {
  // next.js routes
  const nextApp = Next({ dev, dir: "./client" });
  await nextApp.prepare();
  const nextHandler = nextApp.getRequestHandler();
  // TODO: cast fastify to any until type definition for `all` is added
  (fastify as any).all(
    "/*",
    (
      req: Fastify.FastifyRequest<http.IncomingMessage>,
      res: Fastify.FastifyReply<http.ServerResponse>
    ) => {
      const parsedUrl = parse(req.req.url, true);
      nextHandler(req.req, res.res, parsedUrl);
    }
  );
};

export const buildFastify = (
  serverOptions: Fastify.ServerOptions = { logger: true }
): Fastify.FastifyInstance => {
  return Fastify(serverOptions);
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

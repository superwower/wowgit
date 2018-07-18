import { parse } from "url";
import { graphiqlFastify, graphqlFastify } from "fastify-graphql";

export const registerRoutes = (server, next, graphqlSchema) => {
  server.register(graphqlFastify, {
    prefix: "/graphql",
    graphql: {
      schema: graphqlSchema
    }
  });
  server.register(graphiqlFastify, {
    prefix: "/graphiql",
    graphiql: {
      endpointURL: "/graphql"
    }
  });

  const nextHandler = next.getRequestHandler();
  server.all("/*", (req, res) => {
    const parsedUrl = parse(req.req.url, true);
    nextHandler(req.req, res.res, parsedUrl);
  });
};

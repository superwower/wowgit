import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    authors(obj, args, context, info) {
      return [];
    },
    status(obj, args, context, info) {
      return context.statusService.getStatus(args.path);
    }
  }
};

export default resolvers;

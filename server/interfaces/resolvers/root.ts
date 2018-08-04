import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    authors(obj, args, context, info) {
      return [];
    },
    status(obj, args, context, info) {
      return context.statusService.getStatus(args.path);
    },
    remotes(obj, args, context, info) {
      return context.remoteService.getRemotes(args.path);
    }
  }
};

export default resolvers;

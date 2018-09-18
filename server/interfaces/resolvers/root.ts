import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    authors(obj, args, context, info) {
      return [];
    },
    status(obj, args, context, info) {
      return context.queryService.getStatus(args.path);
    },
    remotes(obj, args, context, info) {
      return context.queryService.getRemotes(args.path);
    },
    isGitRepository(obj, args, context, info) {
      return context.queryService.isGitRepository(args.path);
    }
  }
};

export default resolvers;

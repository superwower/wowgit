import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    authors(obj, args, context, info) {
      return [];
    },
    status(obj, args, context, info) {
      return context.queryService.getStatus(args.path);
    },
    isGitRepository(obj, args, context, info) {
      return context.queryService.isGitRepository(args.path);
    },
    getLocalBranches(obj, { path }, context, info) {
      return context.queryService.getLocalBranches(path);
    }
  }
};

export default resolvers;

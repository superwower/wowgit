import { IResolvers } from "graphql-tools";
import authorResolvers from "./author";
import statusResolvers from "./status";
import StatusService from "../../app/status";
import NodeGitService from "../../infra/git_service";

const _authors = [
  { name: "hitoshi", email: "hitoshi@hoge.com" },
  { name: "haru", email: "haru@hoge.com" }
];

const resolvers: IResolvers = {
  Query: {
    authors(obj, args, context, info) {
      return _authors;
    },
    status(obj, args, context, info) {
      return new StatusService(new NodeGitService()).getStatus(
        "/home/hitochan/developer/wowgit"
      );
    }
  }
};

export default [resolvers, authorResolvers, statusResolvers];

import authorResolvers from "./author";

const _authors = [
  { name: "hitoshi", email: "hitoshi@hoge.com" },
  { name: "haru", email: "haru@hoge.com" }
];

const resolvers = {
  Query: {
    authors(obj, args, context, info) {
      return _authors;
    }
  }
};

export default [resolvers, authorResolvers];

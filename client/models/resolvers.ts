export default {
  Mutation: {},
  Query: {
    repos: (obj, args, context, info) => {
      return [
        { name: "wowgit", src: "/opt/wowgit", __typename: "Repository" },
        { name: "unknown", src: "hey", __typename: "Repository" }
      ];
    },
    currentRepo: (obj, args, context, info) => {
      return { name: "wowgit", src: "/opt/wowgit", __typename: "Repository" };
    }
  }
};

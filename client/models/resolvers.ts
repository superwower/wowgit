export default {
  Mutation: {
    updateCurrentRepo: (_, { currentRepoName }, { cache }) => {
      const data = { currentRepoName };
      cache.writeData({ data });
    }
  },
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

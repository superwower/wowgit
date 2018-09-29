import gql from "graphql-tag";

const repos = [
  // TODO: implement
  { name: "wowgit", src: "/opt/wowgit", __typename: "Repository" },
  { name: "unknown", src: "hey", __typename: "Repository" }
];

export default {
  Mutation: {
    updateCurrentRepo: (_, { currentRepoName }, { cache }) => {
      const data = { currentRepoName };
      cache.writeData({ data });
    },
    registerRepository: (_, { name, src }, { cache }) => {
      const query = gql`
        {
          repos @client {
            name
            src
          }
        }
      `;

      const previous = cache.readQuery({ query });
      const newRepo = {
        name,
        src,
        __typename: "Repository"
      };
      const data = {
        repos: previous.repos.concat([newRepo])
      };

      cache.writeQuery({ query, data });
      return newRepo;
    }
  },
  Query: {
    repos: (obj, args, context, info) => {
      return repos;
    },
    currentRepo: (obj, args, context, info) => {
      // TODO: implement
      return { name: "wowgit", src: "/opt/wowgit", __typename: "Repository" };
    }
  }
};

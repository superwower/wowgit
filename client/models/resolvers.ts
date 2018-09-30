import gql from "graphql-tag";

export default {
  Mutation: {
    registerRepository: (_, { input: { name, src } }, { cache }) => {
      const query = gql`
        {
          repos @client {
            id
            name
            src
          }
        }
      `;
      const { repos } = cache.readQuery({ query });

      const newId = Math.max(repos.map(repo => +repo.id)) + 1;
      const newRepo = {
        __typename: "Repository",
        id: `${newId}`, // convert number to string
        name,
        src
      };
      const data = {
        repos: [...repos, newRepo]
      };
      cache.writeQuery({ query, data });
      return newRepo;
    },
    updateCurrentRepo: (_, { currentRepoName }, { cache }) => {
      const data = { currentRepoName };
      cache.writeData({ data });
      // See why we need to return null: https://github.com/apollographql/apollo-link-state/issues/160
      return null;
    }
  },
  Query: {
    repos: (_0, _1, { cache }, _2) => {
      const query = gql`
        {
          entities @client {
            repos {
              id
              name
              src
            }
          }
        }
      `;
      const {
        entities: { repos }
      } = cache.readQuery({ query });
      return repos;
    }
  }
};

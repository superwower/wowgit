import gql from "graphql-tag";

export default {
  Mutation: {
    updateCurrentRepo: (_, { currentRepoName }, { cache }) => {
      const data = { currentRepoName };
      cache.writeData({ data });
      // See why we need to return null: https://github.com/apollographql/apollo-link-state/issues/160
      return null;
    },
    registerRepository: (_, { input: { name, src } }, { cache }) => {
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

      const newId = Math.max(repos.map(repo => +repo.id)) + 1;
      const newRepo = {
        id: `${newId}`, // convert number to string
        name,
        src,
        __typename: "Repository"
      };
      const data = {
        entities: {
          repos: [...repos, newRepo],
          __typename: "entities"
        }
      };

      cache.writeData({ data });
      return newRepo;
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

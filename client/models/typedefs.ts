export default `
type Query {
  currentRepoName: String!
  repos: [Repository!]
}

type Mutation {
  updateCurrentRepo(currentRepoName: $currentRepoName): Boolean!
}

type Repository {
  name: String!
  src: String
}
`;

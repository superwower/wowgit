export default `
type Query {
  currentRepoName: String!
  repos: [Repository!]
}

type Mutation {
  registerRepository(newRepo: Repository): Boolean!
  updateCurrentRepo(currentRepoName: String!): Boolean!
}

type Repository {
  name: String!
  src: String
}
`;

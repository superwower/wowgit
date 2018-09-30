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
  id: ID
  name: String!
  src: String
}
`;

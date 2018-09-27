export default `
type Query {
  currentRepo: Repository!
  repos: [Repository!]
}

type Repository {
  name: String!
  src: String
}
`;

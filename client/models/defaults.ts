type ID = string;
export interface Repository {
  id: ID;
  name: string | null;
  src: string;
  __typename: string;
}

export interface LocalState {
  entities: {
    repo: Repository[];
    __typename: string;
  };
  currentRepoName: string | null;
}

const defaults: LocalState = {
  entities: {
    repos: [],
    __typename: "entities"
  },
  currentRepoName: null
};

export default defaults;

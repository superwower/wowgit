type ID = string;

export interface IRepository {
  __typename: string;
  id: ID;
  name: string | null;
  src: string;
}

export interface ILocalState {
  entities: {
    __typename: string;
    repo: Repository[];
  };
  currentRepoName: string | null;
}

const defaults: ILocalState = {
  currentRepoName: null,
  entities: {
    __typename: "entities",
    repos: []
  }
};

export default defaults;

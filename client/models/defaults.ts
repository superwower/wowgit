export interface Repository {
  name: string | null;
  src: string;
}

export interface LocalState {
  entities: {
    repo: {
      byId: { [id: number]: Repository };
      all: number[];
    };
  };
  currentRepoName: string | null;
}

const defaults: LocalState = {
  entities: {
    repo: {
      byId: { __typename: "byId" },
      all: [],
      __typename: "repo"
    },
    __typename: "entities"
  },
  currentRepoName: null
};

export default defaults;

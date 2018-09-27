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
  currentRepo: number | null;
}

const defaults: LocalState = {
  entities: {
    repo: {
      byId: {},
      all: []
    }
  },
  currentRepo: null
};

export default defaults;

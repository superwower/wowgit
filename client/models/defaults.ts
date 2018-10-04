import { ID, IRepository } from "./typings";

export interface ILocalState {
  entities: {
    __typename: string;
    repos: IRepository[];
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

import { Modeler } from "redux-aggregate";

export interface IRepoST {
  name: string | null;
  path: string;
}

export const repoModel: Modeler<IRepoST> = injects => ({
  name: null,
  path: "",
  ...injects
});

const getDisplayName = (state: IRepoST): string =>
  state.name === null ? state.path : state.name;

export const repoQR = {
  getDisplayName
};

import { Modeler } from "redux-aggregate";

export interface IRepoST {
  name: string | null;
  src: string;
}

export const repoModel: Modeler<IRepoST> = injects => ({
  name: null,
  src: "",
  ...injects
});

const getDisplayName = (state: IRepoST): string =>
  state.name === null ? state.src : state.name;

export const repoQR = {
  getDisplayName
};

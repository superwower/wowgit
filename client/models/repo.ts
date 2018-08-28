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

/**
 * It uses repository src as a fallback
 * @param { IRepoST } state Repository state
 * @returns { string } display name
 */
const getDisplayName = (state: IRepoST): string =>
  state.name === null ? state.src : state.name;

export const repoQR = {
  getDisplayName
};

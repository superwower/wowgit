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

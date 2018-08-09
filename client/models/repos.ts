import { Modeler } from "redux-aggregate";
import { IRepoST, repoModel } from "./repo";

export interface IReposST {
  name: string | null;
  path: string;
  items: IRepoST[];
}

export const reposModel: Modeler<IReposST> = injects => ({
  items: [],
  name: null,
  path: "",
  ...injects
});

const addRepo = (state: IReposST): IReposST => {
  const { name, path } = state;
  if (path === "") {
    return state;
  }
  const repo = repoModel({
    name,
    path
  });
  const items = [...state.items];
  items.push(repo);
  return { ...state, items, path: "", name: null };
};

export const reposMT = {
  addRepo
};

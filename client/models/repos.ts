import { Modeler } from "redux-aggregate";
import { IRepoST, repoModel, repoQR } from "./repo";

export interface IReposST {
  name: string | null;
  path: string;
  items: IRepoST[];
}

export const reposModel: Modeler<IReposST> = injects => ({
  items: [
    repoModel({ name: "wowgit", path: "/home/hitochan/wowgit" }),
    repoModel({ name: "super", path: "/home/hitochan/super" })
  ],
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

import { Modeler } from "redux-aggregate";
import { IRepoST, repoModel } from "./repo";

export interface IReposST {
  items: IRepoST[];
}

export interface IAddRepoPayload {
  name: string | null;
  src: string;
}

export const reposModel: Modeler<IReposST> = injects => ({
  items: [],
  ...injects
});

const addRepo = (state: IReposST, { name, src }: IAddRepoPayload): IReposST => {
  if (src === "") {
    return state;
  }
  const repo = repoModel({
    name,
    src
  });
  const items = [...state.items];
  items.push(repo);
  return { ...state, items };
};

export const reposMT = {
  addRepo
};

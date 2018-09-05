import { Modeler } from "redux-aggregate";
import { IRemoteST, remoteModel } from "./remote";

export interface IRemotesST {
  items: IRemoteST[];
}

export const remotesModel: Modeler<IRemotesST> = injects => ({
  items: [],
  ...injects
});

const fetchRemtoes = (state: IRemotesST): IRemotesST => {
  const items = [...state.items];
  items.push({ name: "test", branches: [{ name: "test" }] });
  return { ...state, items };
};

export const remotesMT = {
  fetchRemtoes
};

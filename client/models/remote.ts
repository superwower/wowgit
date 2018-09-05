import { Modeler } from "redux-aggregate";
import { IBranchST } from "./branch";

export interface IRemoteST {
  name: string;
  branches: IBranchST[];
}

export const remoteModel: Modeler<IRemoteST> = injects => ({
  name: null,
  branches: [],
  ...injects
});

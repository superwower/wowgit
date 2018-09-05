/**
 * The root model that aggregates sub models
 */
import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { createAggregate, Modeler } from "redux-aggregate";
import { composeWithDevTools } from "redux-devtools-extension";

import { IReposST, reposModel, reposMT } from "./repos";
import { IRemotesST, remotesModel, remotesMT } from "./remotes";

// Root store
export interface IStoreST {
  repos: IReposST;
  remotes: IRemotesST;
}

export const repos = createAggregate(reposMT, "repos/");
export const remotes = createAggregate(remotesMT, "remotes/");

export const storeFactory = <R extends ReducersMapObject>(
  reducer: R
): Store<IStoreST> => {
  return createStore(combineReducers(reducer), composeWithDevTools());
};

export const store = storeFactory({
  repos: repos.reducerFactory(reposModel()),
  remotes: remotes.reducerFactory(remotesModel())
});

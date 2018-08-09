import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { createAggregate, Modeler } from "redux-aggregate";
import { composeWithDevTools } from "redux-devtools-extension";

import { IReposMT, IReposST, reposModel } from "./repos";

export interface IStoreST {
  repos: IRepoST;
}

export const repos = createAggregate(ReposMT, "repos/");

export const storeFactory = <R extends ReducersMapObject>(
  reducer: R
): Store<IStoreST> => {
  return createStore(combineReducers(reducer), composeWithDevTools());
};

export const store = storeFactory({
  repos: repos.reducerFactory(reposModel())
});

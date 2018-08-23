import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { createAggregate, Modeler } from "redux-aggregate";
import { composeWithDevTools } from "redux-devtools-extension";

import { IReposST, reposModel, reposMT } from "./repos";

export interface IStoreST {
  repos: IReposST;
}

export const repos = createAggregate(reposMT, "repos/");

export const storeFactory = <R extends ReducersMapObject>(
  reducer: R
): Store<IStoreST> => {
  return createStore(combineReducers(reducer), composeWithDevTools());
};

export const store = storeFactory({
  repos: repos.reducerFactory(reposModel())
});

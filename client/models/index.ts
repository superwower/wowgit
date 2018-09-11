/**
 * The root model that aggregates sub models
 */
import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { createAggregate, Modeler } from "redux-aggregate";
import { composeWithDevTools } from "redux-devtools-extension";

import { loadState, saveState } from "../lib/storage/localStorage";
import { IReposST, reposModel, reposMT } from "./repos";

// Root store
export interface IStoreST {
  repos: IReposST;
}

export const repos = createAggregate(reposMT, "repos/");

export const storeFactory = <R extends ReducersMapObject>(
  reducer: R
): Store<IStoreST> => {
  const persistedStore = loadState();
  const newStore = createStore(
    combineReducers(reducer),
    persistedStore,
    composeWithDevTools()
  );
  newStore.subscribe(() => {
    saveState(newStore.getState());
  });
  return newStore;
};

export const store = storeFactory({
  repos: repos.reducerFactory(reposModel())
});

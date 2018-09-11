import { IStoreST } from "../../models";
import isBrowser from "../is-browser";

export const loadState = () => {
  if (!isBrowser) {
    return;
  }
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: IStoreST) => {
  if (!isBrowser) {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // TODO: log error
  }
};

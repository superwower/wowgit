import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { compose, withState } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import AddRepoModal from "../components/AddRepoModal";
import NavbarDropdown from "../components/navbarDropdown";
import { IStoreST } from "../models";
import { repoQR } from "../models/repo";
import { IReposST } from "../models/repos";

export interface IMapState {
  repos: RepoST[];
}

const mapState = (state: IReposST): IMapState => ({
  repos: state.items
});

export const withIsActive = withState("isActive", "setIsActive", true);

export const header = ({ repos, isActive, setIsActive }: MapState) => (
  <div className="navbar is-primary">
    <div className="navbar-brand">
      <Link href="/">
        <span className="navbar-item">Wowgit</span>
      </Link>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <NavbarDropdown
          title="Repository"
          items={repos.map(repo => repoQR.getDisplayName(repo))}
        />
        <NavbarDropdown title="Branch" items={["Branch1", "Branch2"]} />
      </div>
      <div className="navbar-right">
        <a className="navbar-item">
          <span
            onClick={() => {
              setIsActive(true);
            }}
          >
            Add repository
          </span>
        </a>
      </div>
    </div>
    <AddRepoModal
      isActive={isActive}
      closeHandler={() => {
        setIsActive(false);
      }}
    />
  </div>
);

export default compose(
  withIsActive,
  connect(
    (store: IStoreST) => mapState(store.repos)
    // (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
  )
)(header);

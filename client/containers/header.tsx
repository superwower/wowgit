import gql from "graphql-tag";
import Link from "next/link";
import * as React from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { compose, withState } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import AddRepoModal from "../components/AddRepoModal/AddRepoModal";
import NavbarDropdown from "../components/navbarDropdown";
import { IStoreST } from "../models";
import { IRepoST, repoQR } from "../models/repo";
import { IReposST } from "../models/repos";

const GET_LOCAL_BRANCHES = gql`
  query getLocalBranches($path: String) {
    getLocalBranches(path: $path)
  }
`;

export interface IMapState {
  repos: IRepoST[];
}

export interface IProps extends IMapState {
  isActive: boolean; // is the modal for adding repository shown?
  setIsActive: (isActive: boolean) => void;
}

const mapState = (state: IReposST): IMapState => ({
  repos: state.items
});

export const withIsActive = withState("isActive", "setIsActive", false);

export const header = ({
  repos,
  isActive,
  setIsActive,
  loading,
  error,
  data
}: IProps) => (
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
        <div className="navbar-item">
          <span
            className="navbar-link"
            onClick={() => {
              setIsActive(true);
            }}
          >
            Add
          </span>
        </div>
      </div>
    </div>
    <AddRepoModal
      isActive={isActive}
      closeModal={() => {
        setIsActive(false);
      }}
    />
  </div>
);

const withQuery = Component => (props: IProps) => (
  <Query query={GET_LOCAL_BRANCHES}>
    {({ loading, error, data }) => {
      console.log(data);
      return (
        <Component {...props} loading={loading} error={error} data={data} />
      );
    }}
  </Query>
);

export default compose(
  withIsActive,
  connect<IMapState, {}, {}>((store: IStoreST) => mapState(store.repos)),
  withQuery
)(header);

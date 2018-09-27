import gql from "graphql-tag";
import Link from "next/link";
import * as React from "react";
import { graphql, Query } from "react-apollo";
import { compose, withState } from "recompose";

import AddRepoModal from "../components/AddRepoModal/AddRepoModal";
import NavbarDropdown from "../components/navbarDropdown";

const GET_LOCAL_BRANCHES = gql`
  {
    getLocalBranches(path: "/opt/wowgit") {
      name
    }
  }
`;

const GET_REGISTERED_REPOS = gql`
  {
    repos @client {
      name
      src
    }
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
export const withCurrentRepo = withState("currentRepo", "setCurrentRepo", null);

export const header = ({
  repos,
  isActive,
  setIsActive,
  currentRepo,
  setCurrentRepo,
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
          items={repos.map(repo => repo.name)}
          onClick={name => {
            setCurrentRepo(name);
          }}
        />
        <NavbarDropdown
          title="Branch"
          items={
            data.getLocalBranches
              ? data.getLocalBranches.map(branch => branch.name)
              : []
          }
        />
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

const withQuery = Component => (props: IProps) => {
  console.log(props);
  const repo = props.repos.find(repo => repo.src == props.currentRepo);
  const currentRepoSrc = repo ? repo.src : null;
  return (
    <Query
      query={GET_LOCAL_BRANCHES}
      variables={{ path: currentRepoSrc }}
      skip={props.currentRepo === null}
    >
      {({ loading, error, data }) => {
        return (
          <Component {...props} loading={loading} error={error} data={data} />
        );
      }}
    </Query>
  );
};

export default compose(
  withCurrentRepo,
  withIsActive,
  graphql(GET_REGISTERED_REPOS, {
    props: data => {
      console.log(data);
      return { repos: [] };
    }
  }),
  withQuery
)(header);

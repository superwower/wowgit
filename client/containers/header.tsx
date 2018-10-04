import gql from "graphql-tag";
import Link from "next/link";
import * as React from "react";
import { graphql, Query } from "react-apollo";
import { compose, withState } from "recompose";

import Branch from "../../server/domain/branch";
import AddRepoModal from "../components/AddRepoModal/AddRepoModal";
import NavbarDropdown from "../components/navbarDropdown";
import { IRepository } from "../models/typings";

const GET_LOCAL_BRANCHES = gql`
  query getLocalBranches($path: String) {
    getLocalBranches(path: $path) {
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
    currentRepoName @client
  }
`;

const UPDATE_CURRENT_REPO = gql`
  mutation updateCurrentRepo($currentRepoName: String!) {
    updateCurrentRepo(currentRepoName: $currentRepoName) @client
  }
`;

export interface IProps {
  isActive: boolean; // is the modal for adding repository shown?
  setIsActive: (isActive: boolean) => void;
  updateCurrentRepo: (currentRepo: any) => void;
  repos: IRepository[];
  currentRepoName: string;
  localBranches: Branch[];
}

export const withIsActive = withState("isActive", "setIsActive", false);

export const header = ({
  repos,
  isActive,
  setIsActive,
  currentRepoName,
  localBranches,
  updateCurrentRepo
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
          title={currentRepoName || "Repository"}
          items={repos.map(repo => repo.name)}
          onClick={name => {
            updateCurrentRepo({ variables: { currentRepoName: name } });
          }}
        />
        <NavbarDropdown
          title="Branch"
          items={localBranches ? localBranches.map(branch => branch.name) : []}
          onClick={name => {
            alert(`branch ${name} clicked`);
          }}
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

export default compose(
  withIsActive,
  graphql<
    {},
    { currentRepoName: string; repos: IRepository[] },
    {},
    { currentRepoName: string; repos: IRepository[] }
  >(GET_REGISTERED_REPOS, {
    props: ({ data: { currentRepoName, repos } }) => ({
      currentRepoName,
      repos
    })
  }),
  graphql(UPDATE_CURRENT_REPO, {
    name: "updateCurrentRepo"
  }),
  graphql<
    { currentRepoName: string; repos: IRepository[] },
    { getLocalBranches: Branch[] },
    { path: string | undefined },
    { localBranches: Branch[] }
  >(GET_LOCAL_BRANCHES, {
    options: ({ currentRepoName, repos }) => {
      const currentRepo = repos.find(repo => repo.name === currentRepoName);
      return {
        variables: {
          path: currentRepo && currentRepo.src
        }
      };
    },
    props: ({ data: { getLocalBranches } }) => ({
      localBranches: getLocalBranches
    }),
    skip: ({ currentRepoName }) => currentRepoName === null
  })
)(header);

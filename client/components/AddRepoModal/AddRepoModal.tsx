import { ApolloClient, InMemoryCache } from "apollo-boost";
import classNames from "classnames";
import gql from "graphql-tag";
import * as React from "react";
import { graphql, Query } from "react-apollo";
import { compose, withHandlers, withState } from "recompose";

import { withApolloConsumer } from "../../lib/apollo/with-apollo";
import InputBox from "./InputBox";

const IS_GIT_REPO = gql`
  query IsGitRepository($path: String) {
    isGitRepository(path: $path)
  }
`;

const REGISTER_REPO = gql`
  mutation registerRepository($input: Repository) {
    registerRepository(input: $input) @client
  }
`;

export type ImportType = "LOCAL" | "REMOTE";

export interface IProps {
  registerRepository: (repo: any) => void; // TODO: use narrower type
  isActive: boolean; // is the modal shown?
  client: ApolloClient<InMemoryCache>;
  closeModal: () => void;
  activeTab: ImportType;
  setActiveTab: (importType: ImportType) => void;
  setName: (name: string | null) => void;
  setSrc: (src: string) => void;
  name: string | null;
  src: string;
  onAddClick: () => Promise<void>;
  onCancelClick: () => void;
}

/**
 * Reset the values in the modal form
 */
const resetForm = (props: IProps): void => {
  props.setName("");
  props.setSrc("");
};

export const enhance = compose(
  withState("activeTab", "setActiveTab", "LOCAL"),
  withState("name", "setName", ""),
  withState("src", "setSrc", ""),
  withHandlers({
    onAddClick: (props: IProps) => async () => {
      const { name, src, client, registerRepository } = props;
      const result: any = await client.query({
        query: IS_GIT_REPO,
        variables: {
          path: src
        }
      });

      if (result.data.isGitRepository) {
        registerRepository({ variables: { input: { name, src } } });
        resetForm(props);
        props.closeModal();
        return;
      }
      alert(src + " is not valid");
    },
    onCancelClick: (props: IProps) => () => {
      resetForm(props);
      props.closeModal();
    }
  })
);

/**
 * This is a stateless components for a modal to import git repository
 *
 */
export const addRepoModal: React.SFC<IProps> = ({
  isActive,
  client,
  closeModal,
  activeTab,
  setActiveTab,
  setName,
  setSrc,
  name,
  src,
  onAddClick,
  onCancelClick,
  registerRepository
}: IProps) => (
  <div className={classNames("modal", { "is-active": isActive })}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">New Repository</p>
        <button className="delete" onClick={closeModal} />
      </header>
      <section className="modal-card-body">
        <div className="tabs is-boxed">
          <ul>
            <li
              className={classNames({ "is-active": activeTab === "LOCAL" })}
              onClick={() => {
                setActiveTab("LOCAL");
              }}
            >
              <a>From local</a>
            </li>
            <li
              className={classNames({
                "is-active": activeTab === "REMOTE"
              })}
              onClick={() => {
                setActiveTab("REMOTE");
              }}
            >
              <a>From remote</a>
            </li>
          </ul>
        </div>
        <div>
          <InputBox
            labelName="Name"
            placeholder="Name"
            onChange={e => {
              setName((e.target as HTMLInputElement).value);
            }}
            value={name}
          />
          <InputBox
            labelName={activeTab === "LOCAL" ? "Path" : "URL"}
            placeholder={activeTab === "LOCAL" ? "Local Path" : "Remote URL"}
            onChange={e => {
              setSrc((e.target as HTMLInputElement).value);
            }}
            value={src}
          />
        </div>
      </section>
      <footer
        className="modal-card-foot"
        style={{
          // TODO: don't use inline style
          justifyContent: "flex-end"
        }}
      >
        <a className="button" onClick={onAddClick}>
          Add
        </a>

        <a className="button" onClick={onCancelClick}>
          Cancel
        </a>
      </footer>
    </div>
  </div>
);

export default compose(
  withApolloConsumer,
  graphql(REGISTER_REPO, {
    name: "registerRepository"
  }),
  enhance
)(addRepoModal);

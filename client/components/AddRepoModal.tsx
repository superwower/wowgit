import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, withState } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { IStoreST, repos } from "../models";
import { reposMT } from "../models/repos";

export type ImportType = "LOCAL" | "REMOTE";

interface IMapDispatch {
  addRepo: (value: { name: string | null; src: string }) => void;
}

export interface IProps extends IMapDispatch {
  isActive: boolean; // is the modal shown?
  closeModal: () => void;
  activeTab: ImportType;
  setActiveTab: (importType: ImportType) => void;
  setName: (name: string | null) => void;
  setSrc: (src: string) => void;
  name: string | null;
  src: string;
  onAddClick: () => void;
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
    onAddClick: (props: IProps) => () => {
      const { name, src } = props;
      props.addRepo({ name, src });
      resetForm(props);
      props.closeModal();
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
  addRepo,
  isActive,
  closeModal,
  activeTab,
  setActiveTab,
  setName,
  setSrc,
  name,
  src,
  onAddClick,
  onCancelClick
}: IProps) => (
  <div className={classNames("modal", { "is-active": isActive })}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        >
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
          <div className="field">
            <label className="label">Name</label>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Name"
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">
              {activeTab === "LOCAL" ? "Path" : "URL"}
            </label>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder={
                      activeTab === "LOCAL" ? "Local Path" : "Remote URL"
                    }
                    onChange={e => {
                      setSrc(e.target.value);
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
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

const mapDispatch = (dispatch: Dispatch<AnyAction>): IMapDispatch =>
  bindActionCreators(
    {
      addRepo: repos.creators.addRepo
    },
    dispatch
  );

export default compose(
  connect<{}, IMapDispatch, {}>(
    (store: IStoreST) => ({}),
    (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
  ),
  enhance
)(addRepoModal);

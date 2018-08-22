import classNames from "classnames";
import * as React from "react";
import { compose, withState } from "recompose";

type ImportType = "LOCAL" | "REMOTE";

export interface IProps {
  isActive: boolean;
  closeHandler: () => void;
  activeTab: ImportType;
  setActiveTab: (importType: ImportType) => void;
  setRemoteName: (name: string) => void;
  setRemotePath: (path: string) => void;
  setLocalName: (name: string) => void;
  setLocalPath: (path: string) => void;
}

export const withActiveTab = withState("activeTab", "setActiveTab", "LOCAL");

export const addRepoModal = ({
  isActive,
  closeHandler,
  activeTab,
  setActiveTab,
  setRemoteName,
  setRemotePath,
  setLocalPath,
  setLocalName
}: IProps) => (
  <div className={classNames("modal", { "is-active": isActive })}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        >
        <p className="modal-card-title">New Repository</p>
        <button className="delete" onClick={closeHandler} />
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
        {activeTab === "LOCAL" ? (
          <div>
            <div className="field">
              <label className="label">Name</label>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Local Name"
                      onChange={e => {
                        setLocalName(e.target.value);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Path</label>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Local Path"
                      onChange={e => {
                        setLocalPath(e.target.value);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="field">
              <label className="label">Name</label>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Remote name"
                      onChange={e => {
                        setRemoteName(e.target.value);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Path</label>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Remote path"
                      onChange={e => {
                        setRemotePath(e.target.value);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <footer
        className="modal-card-foot"
        style={{ justifyContent: "flex-end" }}
      >
        <a
          className="button"
          onClick={() => {
            // TODO: implement
          }}
        >
          Add
        </a>

        <a className="button" onClick={closeHandler}>
          Cancel
        </a>
      </footer>
    </div>
  </div>
);

export default compose(withActiveTab)(addRepoModal);

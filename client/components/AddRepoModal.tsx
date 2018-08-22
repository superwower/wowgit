import classNames from "classnames";
import * as React from "react";
import { compose, withState } from "recompose";

type ImportType = "LOCAL" | "REMOTE";

export interface IProps {
  isActive: boolean;
  closeHandler: () => void;
  activeTab: ImportType;
  setActiveTab: (importType: ImportType) => void;
  setName: (name: string) => void;
  setPath: (path: string) => void;
}

export const withActiveTab = withState("activeTab", "setActiveTab", "LOCAL");

export const addRepoModal = ({
  isActive,
  closeHandler,
  activeTab,
  setActiveTab,
  setName,
  setSrc
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
                      setPath(e.target.value);
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

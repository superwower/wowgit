import classNames from "classnames";
import * as React from "react";
import { compose, withState } from "recompose";

type ImportType = "LOCAL" | "REMOTE";

export interface IProps {
  isActive: boolean;
  closeHandler: () => void;
  activeTab: ImportType;
  setActiveTab: (importType: ImportType) => void;
}

export const withActiveTab = withState("activeTab", "setActiveTab", "LOCAL");

export const addRepoModal = ({
  isActive,
  closeHandler,
  activeTab,
  setActiveTab
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
        <div className="content">
          <div className="card">
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
            {activeTab === "LOCAL" ? <div>Local</div> : <div>Remote</div>}
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        <a className="button" onClick={closeHandler}>
          Cancel
        </a>
      </footer>
    </div>
  </div>
);

export default compose(withActiveTab)(addRepoModal);

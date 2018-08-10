import classNames from "classnames";

export interface IProps {
  isActive: boolean;
  closeHandler: () => void;
}

export default ({ isActive, closeHandler }: IProps) => (
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
                <li className="is-active">
                  <a>Pictures</a>
                </li>
                <li>
                  <a>Music</a>
                </li>
              </ul>
            </div>
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

import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, ReactLifeCycleFunctions } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import RemoteBranches from "../components/remoteBranches";
import { IStoreST, remotesAggs } from "../models";
import { IRemotesST } from "../models/remotes";

export interface IProps {
  remotes: IRemotesST;
  fetchRemotes: () => void;
}

export const branchPane = ({ remotes, fetchRemotes }: IProps) => (
  <div>
    <div className="message is-light">
      <div className="message-header">Remote</div>
      <div className="message-body">
        {remotes.items.map((item, index) => (
          <RemoteBranches
            remote={item.name}
            branches={item.branches}
            key={index}
          />
        ))}
      </div>
    </div>
  </div>
);

const lifeCycleFunctions: ReactLifeCycleFunctions = {
  componentDidMount() {
    this.props.fetchRemotes();
  }
};

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      fetchRemotes: remotesAggs.creators.fetchRemotes
    },
    dispatch
  );

export default compose(
  connect(
    (store: IStoreST) => ({ remotes: store.remotes }),
    (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
  ),
  lifecycle(lifeCycleFunctions)
)(branchPane);

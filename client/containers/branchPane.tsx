import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState, ReactLifeCycleFunctions } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import RemoteBranches from "../components/remoteBranches";
import { IStoreST, remotes } from "../models";
import { IRemotesST } from "../models/remotes";

export interface IProps  {
  remotes: IRemotesST
}

export const branchPane = ({remotes}: IProps) => (
  <div>
    <div className="message is-light">
      <div className="message-header">Remote</div>
      <div className="message-body"> 
      {remotes.items.map((item, index) => (
          <RemoteBranches
            remote={item.name}
            branches={item.branches}
          />
        ))}
      </div>
    </div>
  </div>
);

const lifeCycleFunctions: ReactLifeCycleFunctions = {
  componentDidMount() {
    this.props.fetchRemotes()
    this.setState({remotes: {items: []}});
  },
};

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      fetchRemotes: remotes.creators.fetchRemotes
    },
    dispatch
  );

export default compose(
  connect(
    (store: IStoreST) => ({}),
    (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
  ),
  withState("remotes", "setActiveTab", {items: []}),
  lifecycle(lifeCycleFunctions),
)(branchPane);

import { ApolloClient, InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, ReactLifeCycleFunctions } from "recompose";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { withApolloConsumer } from "../lib/apollo/with-apollo";
import RemoteBranches from "../components/remoteBranches";
import { IStoreST, remotes as remotesAggs } from "../models";
import { IRemotesST } from "../models/remotes";
import { IReposST } from "../models/repos";

const QUERY_REMOTES = gql`
  query remotes($path: String) {
    remotes(path: $path) {
      name
      branches {
        name
      }
    }
  }
`;

export interface IProps {
  repos: IReposST;
  remotes: IRemotesST;
  fetchRemotes: () => void;
  client: ApolloClient<InMemoryCache>;
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
  async componentDidMount() {
    this.props.fetchRemotes();
    const result: any = await this.props.client.query({
      query: QUERY_REMOTES,
      variables: {
        path: "./"
      }
    });
    console.log(result)
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
  withApolloConsumer,
  connect(
    (store: IStoreST) => ({
      remotes : store.remotes,
      repos : store.repos
    }),
    (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
  ),
  lifecycle(lifeCycleFunctions)
)(branchPane);

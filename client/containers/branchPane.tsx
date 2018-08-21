import * as React from "react";
import RemoteBranches from "../components/remoteBranches";

export default () => (
  <div>
    <div className="message is-light">
      <div className="message-header">Remote</div>
      <div className="message-body">
        <RemoteBranches
          remote="origin"
          branches={["master", "graphql-base", "remote-branches"]}
        />
        <RemoteBranches
          remote="upstream"
          branches={["master", "graphql-base", "remote-branches"]}
        />
      </div>
    </div>
  </div>
);

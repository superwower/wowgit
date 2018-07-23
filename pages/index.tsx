import Page from "../layouts/main";
import GraphPane from "../containers/graphPane";
import CommitPane from "../containers/commitPane";
import BranchPane from "../containers/branchPane";

export default () => (
  <Page>
    <div className="columns">
      <div className="column">
        <GraphPane />
      </div>
      <div className="column is-half">
        <CommitPane />
      </div>
      <div className="column">
        <BranchPane />
      </div>
    </div>
  </Page>
);

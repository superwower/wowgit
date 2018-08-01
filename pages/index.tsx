import BranchPane from "../containers/branchPane";
import CommitPane from "../containers/commitPane";
import GraphPane from "../containers/graphPane";
import Page from "../layouts/main";

export default () => (
  <Page>
    <div className="columns">
      <div className="column">
        <BranchPane />
      </div>
      <div className="column is-half">
        <GraphPane />
      </div>
      <div className="column">
        <CommitPane />
      </div>
    </div>
  </Page>
);

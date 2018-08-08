import BranchPane from "../containers/branchPane";
import CommitPane from "../containers/commitPane";
import GraphPane from "../containers/graphPane";
import Page from "../layouts/main";

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

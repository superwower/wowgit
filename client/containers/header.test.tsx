/* tslint:disable:no-empty */
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { compose } from "recompose";

import {
  makeMockApolloClient,
  withMockApolloProvider
} from "../../test/helpers/apollo-client-mock";
import { HeaderContainer, HeaderPresenter, IProps } from "./header";

const MockComponent: React.SFC<{}> = () => <div />;

let client;

beforeAll(() => {
  client = makeMockApolloClient();
});

describe("HeaderContainer", () => {
  it("initializes currentRepoName to null and repos to an empty array", () => {
    const Header = compose(
      withMockApolloProvider(client),
      HeaderContainer
    )(MockComponent);
    const testRenderer = TestRenderer.create(<Header />);
    const instance = testRenderer.root;
    expect(instance.props.currentRepoName).toBe(null);
    expect(instance.props.repos).toEqual([]);
  });

  it("passes localBranches of the specified repository when curent repository is changed ", () => {
    const Header = compose(
      withMockApolloProvider(client),
      HeaderContainer
    )(MockComponent);
    const testRenderer = TestRenderer.create(<Header />);
    const instance = testRenderer.root;
    expect(instance.props.currentRepoName).toBe(null);
    expect(instance.props.repos).toEqual(["repo1", "repo2"]);
    instance.props.updateCurrentRepo({
      variables: { currentRepoName: "repo1" }
    });
    expect(instance.props.currentRepoName).toBe("repo1");
    expect(instance.props.localBranches.map(branch => branch.name)).toEqual([
      "branch1",
      "branch2"
    ]);
  });
});

/* tslint:disable:no-empty */
import gql from "graphql-tag";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { compose } from "recompose";
import * as wait from "waait";

import Branch from "../../server/domain/branch";
import {
  makeMockApolloClient,
  withMockApolloProvider
} from "../../test/helpers/apollo-client-mock";
import { HeaderContainer, HeaderPresenter, IProps } from "./header";

const MockComponent: React.SFC<{}> = props => <div {...props} />;

describe("HeaderContainer", () => {
  it("initializes currentRepoName to null and repos to an empty array", async () => {
    const client = makeMockApolloClient();

    const Header = compose(
      withMockApolloProvider(client),
      HeaderContainer
    )(MockComponent);
    const testRenderer = TestRenderer.create(<Header />);
    const instance = testRenderer.root.findByType(MockComponent);

    await wait(0);
    expect(instance.props.currentRepoName).toBe(null);
    expect(instance.props.repos).toEqual([]);
  });

  it("passes localBranches of the specified repository when curent repository is changed ", async () => {
    const client = makeMockApolloClient({
      localDefaults: {
        currentRepoName: null,
        entities: {
          __typename: "entities",
          repos: [
            {
              __typename: "Repository",
              id: "1",
              name: "repo1",
              src: "/path/to/repo1"
            }
          ]
        }
      },
      serverResolvers: {
        Query: {
          getLocalBranches(_1, _2, _3, _4) {
            return Promise.resolve([
              new Branch("branch1"),
              new Branch("branch2")
            ]);
          }
        }
      }
    });

    const Header = compose(
      withMockApolloProvider(client),
      HeaderContainer
    )(MockComponent);

    const testRenderer = TestRenderer.create(<Header />);
    const instance = testRenderer.root.findByType(MockComponent);
    await wait(0);
    expect(instance.props.currentRepoName).toBe(null);
    expect(instance.props.repos).toHaveLength(1);
    expect(instance.props.repos[0].name).toBe("repo1");
    await instance.props.updateCurrentRepo({
      variables: { currentRepoName: "repo1" }
    });
    await wait(0);
    expect(instance.props.currentRepoName).toBe("repo1");
    expect(instance.props.localBranches.map(branch => branch.name)).toEqual([
      "branch1",
      "branch2"
    ]);
  });
});

describe("HeaderPresenter", () => {
  it("renders without error", () => {
    const testRenderer = TestRenderer.create(
      <HeaderPresenter
        AddRepoModal={() => <div />}
        isActive={false}
        setIsActive={() => {}}
        updateCurrentRepo={() => {}}
        repos={[]}
        currentRepoName={null}
        localBranches={[]}
      />
    );
  });
});

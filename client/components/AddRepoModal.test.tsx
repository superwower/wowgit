/* tslint:disable:no-empty */
import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import {
  addRepoModal as PureAddRepoModal,
  enhance,
  ImportType,
  IProps
} from "./AddRepoModal";

const createProps = (props: { [K in keyof IProps]?: IProps[K] }): IProps => ({
  activeTab: "REMOTE",
  addRepo: () => {},
  closeModal: () => {},
  isActive: false,
  name: "",
  onAddClick: () => {},
  onCancelClick: () => {},
  setActiveTab: activeTab => {},
  setName: name => {},
  setSrc: src => {},
  src: "",
  ...props
});

/* tslint:disable-next-line:variable-name*/
const MockComponent: React.SFC<{}> = () => <div />;

it("calls closeModal when x button is clicked", () => {
  const closeModal = jest.fn();
  const testRenderer = TestRenderer.create(
    <PureAddRepoModal {...createProps({ closeModal })} />
  );
  const instance = testRenderer.root;
  const closeButton = instance.find(el => el.type === "button");
  closeButton.props.onClick();
  expect(closeModal).toHaveBeenCalledTimes(1);
});

describe("recompose HOCs", () => {
  describe("onAddClick", () => {
    it(`1) adds repo to repo list with the specified name
        2) clears name and src when Add button is clicked
        3) closes modal`, () => {
      const addRepo = jest.fn();
      const closeModal = jest.fn();
      /* tslint:disable-next-line:variable-name*/
      const Enhanced = enhance(MockComponent);
      const testRenderer = TestRenderer.create(
        <Enhanced addRepo={addRepo} closeModal={closeModal} />
      );
      const instance = testRenderer.root.findByType(MockComponent);
      instance.props.setName("repo name");
      instance.props.setSrc("repo src");
      instance.props.onAddClick();
      expect(instance.props.name).toBe("");
      expect(instance.props.src).toBe("");
      expect(addRepo).toHaveBeenCalledWith({
        name: "repo name",
        src: "repo src"
      });
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("onCancelClick", () => {
    it("clears name and src when Cancel button is clicked", () => {
      const closeModal = jest.fn();
      /* tslint:disable-next-line:variable-name*/
      const Enhanced = enhance(MockComponent);
      const testRenderer = TestRenderer.create(
        <Enhanced closeModal={closeModal} />
      );
      const instance = testRenderer.root.findByType(MockComponent);
      instance.props.onCancelClick();
      expect(instance.props.name).toBe("");
      expect(instance.props.src).toBe("");
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});

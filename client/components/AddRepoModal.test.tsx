/* tslint:disable:no-empty */
import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import {
  addRepoModal as PureAddRepoModal,
  ImportType,
  IProps
} from "./AddRepoModal";

let instance: TestRenderer.ReactTestInstance;

const createPureAddRepoModal = (props: { [K in keyof IProps]?: IProps[K] }) => {
  const mergedProps: IProps = {
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
  };
  return <PureAddRepoModal {...mergedProps} />;
};

it("calls closeModal when x button is clicked", () => {
  const closeModal = jest.fn();
  const testRenderer = TestRenderer.create(
    createPureAddRepoModal({ closeModal })
  );
  instance = testRenderer.root;
  const closeButton = instance.find(el => el.type === "button");
  closeButton.props.onClick();
  expect(closeModal).toHaveBeenCalledTimes(1);
});

it("clears name and src when Add button is clicked", () => {
  // TODO: implement
});

it("clears name and src when Cancel button is clicked", () => {
  // TODO: implement
});

it("add name to repository list when Add button is clicked", () => {
  // TODO: implement
});

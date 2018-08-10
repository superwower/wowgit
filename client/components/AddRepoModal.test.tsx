import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import AddRepoModal from "./AddRepoModal";

let renderer: TestRenderer.ReactTestRenderer;
let instance: TestRenderer.ReactTestInstance;

it("calls close handler when x button is clicked", () => {
  const closeHandler = jest.fn();
  const testRenderer = TestRenderer.create(
    <AddRepoModal isActive={false} closeHandler={closeHandler} />
  );
  instance = testRenderer.root;
  const closeButton = instance.find(el => el.type == "button");
  closeButton.props.onClick();
  expect(closeHandler).toHaveBeenCalledTimes(1);
});

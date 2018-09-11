/* tslint:disable:no-empty */
import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import {
  addRepoModal as PureAddRepoModal,
  enhance,
  ImportType,
  IProps
} from "./AddRepoModal";

/**
 * create a props object for addRepoModal component.
 * It merges the given object with the default values so
 * that you don't need to specify all the fields in props.
 * @param { { [K in keyof IProps]?: IProps[K] } } props an object that contains part of fields in IProps
 * @returns { IProps } props object that are merged with default vaues
 */
const createProps = (props: { [K in keyof IProps]?: IProps[K] }): IProps => ({
  activeTab: "REMOTE",
  addRepo: () => {},
  client: {}, // TODO: propery handle
  closeModal: () => {},
  isActive: false,
  name: "",
  onAddClick: () => Promise.resolve(),
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
    it(`1) adds repo to repo list with the specified name and src which is git repo
        2) clears name and src when Add button is clicked
        3) closes modal`, async () => {
      const addRepo = jest.fn();
      const closeModal = jest.fn();
      /* tslint:disable-next-line:variable-name*/
      const Enhanced = enhance(MockComponent);
      const testRenderer = TestRenderer.create(
        <Enhanced
          addRepo={addRepo}
          closeModal={closeModal}
          client={{
            query() {
              return Promise.resolve({
                data: {
                  isGitRepository: true
                }
              });
            }
          }}
        />
      );
      const instance = testRenderer.root.findByType(MockComponent);
      instance.props.setName("repo name");
      instance.props.setSrc("repo src");
      await instance.props.onAddClick();
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

  it(`does not add repo when the given src does not exist`, async () => {
    const alertTmp = window.alert;
    window.alert = jest.fn();
    const addRepo = jest.fn();
    const closeModal = jest.fn();
    /* tslint:disable-next-line:variable-name*/
    const Enhanced = enhance(MockComponent);
    const testRenderer = TestRenderer.create(
      <Enhanced
        addRepo={addRepo}
        closeModal={closeModal}
        client={{
          query() {
            return Promise.resolve({
              data: {
                isGitRepository: false
              }
            });
          }
        }}
      />
    );
    const instance = testRenderer.root.findByType(MockComponent);
    instance.props.setName("repo name");
    instance.props.setSrc("repo src");
    await instance.props.onAddClick();
    expect(instance.props.name).toBe("repo name");
    expect(instance.props.src).toBe("repo src");
    expect(addRepo).not.toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledTimes(1);
    window.alert = alertTmp;
  });
});

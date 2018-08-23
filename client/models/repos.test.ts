import { IRepoST } from "./repo";
import { IAddRepoPayload, reposModel, reposMT } from "./repos";

describe("ReposMT", () => {
  describe("addRepo", () => {
    it("just returns original state when src is empty", () => {
      const state = reposModel();
      const payload: IAddRepoPayload = {
        name: "hello",
        src: ""
      };
      const newState = reposMT.addRepo(state, payload);
      expect(newState).toEqual(state);
    });

    it("adds new repo whose src is stored in the state", () => {
      const state = reposModel({
        items: []
      });
      const payload: IAddRepoPayload = {
        name: "hello-world",
        src: "/home/hitochan77/hello-world"
      };
      const newState = reposMT.addRepo(state, payload);
      const expected: IRepoST = {
        name: "hello-world",
        src: "/home/hitochan77/hello-world"
      };

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual(expected);
    });
  });
});

import { repoMT } from "./repo";
import { reposModel, reposMT } from "./repos";

describe("ReposMT", () => {
  describe("addRepo", () => {
    it("just returns original state when path is empty", () => {
      const state = reposModel();
      const newState = reposMT.addRepo(state);
      expect(newState).toEqual(state);
    });

    it("adds new repo whose path is stored in the state", () => {
      const state = reposModel({
        items: [],
        name: "hello-world",
        path: "/home/hitochan77/hello-world"
      });

      const newState = reposMT.addRepo(state);
      const expected: IRepoST = {
        name: "hello-world",
        path: "/home/hitochan77/hello-world"
      };

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual(expected);
      expect(newState.name).toBe(null);
      expect(newState.path).toBe("");
    });
  });
});

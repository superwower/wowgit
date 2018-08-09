import { repoModel, repoQR } from "./repo";

describe("repoQR", () => {
  describe("getDisplayName", () => {
    it("uses path when name is null", () => {
      const state = repoModel({
        name: null,
        path: "/home/hitochan/super-repo"
      });
      const computed = repoQR.getDisplayName(state);
      const expected = "/home/hitochan/super-repo";
      expect(computed).toEqual(expected);
    });

    it("uses name when name is not null", () => {
      const state = repoModel({
        name: "cool-repo",
        path: "/home/hitochan/super-repo"
      });
      const computed = repoQR.getDisplayName(state);
      const expected = "cool-repo";
      expect(computed).toEqual(expected);
    });
  });
});

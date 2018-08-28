import * as path from "path";

import GitService from "./git_service";

const gitService = new GitService();

describe("isGitRepository", () => {
  it("returns false when a given path is not a git repository", async () => {
    const isRepo = await gitService.isGitRepository(
      path.join(__dirname, "/nonexistent")
    );
    expect(isRepo).toBe(false);
  });
  it("returns true when a given path is a git repository", async () => {
    const isRepo = await gitService.isGitRepository(
      path.join(__dirname, "..", "..")
    );
    expect(isRepo).toBe(true);
  });
});

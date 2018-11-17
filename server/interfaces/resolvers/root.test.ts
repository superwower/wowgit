import { IFieldResolver } from "graphql-tools";

import QueryService from "../../app/query_service";
import Branch from "../../domain/branch";
import File from "../../domain/file";
import GitService from "../../domain/git_service";
import Status from "../../domain/status";
import resolver from "./root";

class MockGitService implements GitService {
  public async getStatus(repositoryPath: string): Promise<Status> {
    const status = new Status(
      [new File("/path/to/untracked/file")],
      [new File("/path/to/modified/file")],
      [new File("/path/to/deleted/file")]
    );
    return Promise.resolve(status);
  }

  public async isGitRepository(path: string): Promise<boolean> {
    return true;
  }

  public async getLocalBranches(path: string): Promise<Branch[]> {
    return [new Branch("branch1"), new Branch("branch2")];
  }
}

describe("Query", () => {
  describe("status", () => {
    it("returns status of a git repository specified by path argument", async () => {
      const args = {
        path: ""
      };
      const context = {
        queryService: new QueryService(new MockGitService())
      };
      /* tslint:disable */
      const status = await resolver.Query["status"]({}, args, context);
      expect(status.untracked).toHaveLength(1);
      expect(status.untracked[0].path).toBe("/path/to/untracked/file");
      expect(status.modified).toHaveLength(1);
      expect(status.modified[0].path).toBe("/path/to/modified/file");
      expect(status.deleted).toHaveLength(1);
      expect(status.deleted[0].path).toBe("/path/to/deleted/file");
    });
  });

  describe("isGitRepository", () => {
    it("returns true if git service returns true", async () => {
      const gitService = new MockGitService();
      gitService.isGitRepository = (path: string) => Promise.resolve(true);
      const context = {
        queryService: new QueryService(gitService)
      };
      /* tslint:disable */
      const isGitRepo = await resolver.Query["isGitRepository"](
        {},
        { path: "/path/to/git/repo" },
        context
      );
      expect(isGitRepo).toBe(true);
    });

    it("returns false if git service returns false", async () => {
      const gitService = new MockGitService();
      gitService.isGitRepository = (path: string) => Promise.resolve(false);
      const context = {
        queryService: new QueryService(gitService)
      };
      /* tslint:disable */
      const isGitRepo = await resolver.Query["isGitRepository"](
        {},
        { path: "/path/to/git/repo" },
        context
      );
      expect(isGitRepo).toBe(false);
    });
  });

  describe("getLocalBranches", () => {
    it("returns local branches", async () => {
      const args = {
        path: ""
      };
      const context = {
        queryService: new QueryService(new MockGitService())
      };
      /* tslint:disable */
      const branches = await resolver.Query["getLocalBranches"](
        {},
        args,
        context
      );
      expect(branches).toHaveLength(2);
      expect(branches[0].name).toBe("branch1");
      expect(branches[1].name).toBe("branch2");
    });
  });
});

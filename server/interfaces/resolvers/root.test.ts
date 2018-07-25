import StatusService from "../../app/status";
import File from "../../domain/file";
import GitService from "../../domain/git_service";
import Status from "../../domain/status";
import resolver from "./root";

class MockGitService implements GitService {
  public getStatus(repositoryPath: string): Promise<Status> {
    const status = new Status(
      [new File("/path/to/untracked/file")],
      [new File("/path/to/renamed/file")],
      [new File("/path/to/modified/file")],
      [new File("/path/to/deleted/file")]
    );
    return Promise.resolve(status);
  }
}

describe("Query", () => {
  describe("status", () => {
    it("returns status of a git repository specified by path argument", async () => {
      const obj = {};
      const args = {
        path: ""
      };
      const context = {
        statusService: new StatusService(new MockGitService())
      };
      const status = await resolver.Query.status({}, args, context);
      expect(status.untracked).toHaveLength(1);
      expect(status.untracked[0].path).toBe("/path/to/untracked/file");
      expect(status.renamed).toHaveLength(1);
      expect(status.renamed[0].path).toBe("/path/to/renamed/file");
      expect(status.modified).toHaveLength(1);
      expect(status.modified[0].path).toBe("/path/to/modified/file");
      expect(status.deleted).toHaveLength(1);
      expect(status.deleted[0].path).toBe("/path/to/deleted/file");
    });
  });
});

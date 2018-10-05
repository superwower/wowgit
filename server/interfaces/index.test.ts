import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { join } from "path";

import QueryService from "../app/query_service";
import Branch from "../domain/branch";
import File from "../domain/file";
import GitService from "../domain/git_service";
import Status from "../domain/status";
import resolvers from "./resolvers";

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

let context;
let rootValue;
let schema;

describe("Query", () => {
  beforeAll(() => {
    const schemaPath = join(__dirname, "schema", "index.graphql");
    const typeDefs = importSchema(schemaPath);
    schema = makeExecutableSchema({ typeDefs, resolvers });
    rootValue = {};
    context = {
      queryService: new QueryService(new MockGitService())
    };
  });

  describe("status", () => {
    it("returns status of a git repository specified by path argument", async () => {
      const source = `
        {
          status(path: "/path/to/git") {
            untracked {
              path
            }
            modified {
              path
            }
            deleted {
              path
            }
          }
        }
      `;
      const result = await graphql(schema, source, rootValue, context);
      const {
        data: {
          status: { untracked, modified, deleted }
        }
      } = result;
      expect(untracked).toHaveLength(1);
      expect(untracked[0].path).toBe("/path/to/untracked/file");
      expect(modified).toHaveLength(1);
      expect(modified[0].path).toBe("/path/to/modified/file");
      expect(deleted).toHaveLength(1);
      expect(deleted[0].path).toBe("/path/to/deleted/file");
    });
  });

  describe("isGitRepository", () => {
    it("returns true if git service returns true", async () => {
      const source = `
        {
          isGitRepository(path: "/path/to/git")
        }
      `;
      const result = await graphql(schema, source, rootValue, context);
      const { data } = result;

      expect(data.isGitRepository).toBe(true);
    });
  });

  describe("getLocalBranches", () => {
    it("returns local branches", async () => {
      const source = `
        {
          getLocalBranches(path: "/path/to/git") {
            name
          }
        }
      `;
      const result = await graphql(schema, source, rootValue, context);
      const {
        data: { getLocalBranches }
      } = result;
      expect(getLocalBranches).toHaveLength(2);
      expect(getLocalBranches[0].name).toBe("branch1");
      expect(getLocalBranches[1].name).toBe("branch2");
    });
  });
});

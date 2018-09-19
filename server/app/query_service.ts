import * as Git from "nodegit";

import Branch from "../domain/branch";
import File from "../domain/file";
import GitService from "../domain/git_service";
import Status from "../domain/status";

/**
 * A service that access the status of git repository.
 * This service corresponds to `git status`.
 */
export default class QueryService {
  private gitService: GitService;

  /**
   * @param gitService an instance of class that implements GitService. Used to access git repository.
   * @return
   */
  constructor(gitService: GitService) {
    this.gitService = gitService;
  }

  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async getStatus(repositoryPath: string): Promise<Status> {
    return this.gitService.getStatus(repositoryPath);
  }

  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async isGitRepository(path: string): Promise<boolean> {
    return this.gitService.isGitRepository(path);
  }

  /**
   * Get a list of local branches
   * @param { string } path path to git repository path
   * @return { Promise<Branch[]> } a list of local branches
   */
  public async getLocalBranches(path: string): Promise<Branch[]> {
    return this.gitService.getLocalBranches(path);
  }
}

import Status from "../domain/status";
import File from "../domain/file";
import * as Git from "nodegit";

import GitService from "../domain/git_service";

/**
 * A service that access the status of git repository.
 * This service corresponds to `git status`.
 */
export default class StatusService {
  private gitService: GitService;

  /**
   * @param gitService an instance of class that implements GitService. Used to access git repository.
     @return
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
}

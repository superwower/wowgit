import GitService from "../domain/git_service";
import Status from "../domain/status";
import Remote from "../domain/remote";

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
  public async getRemotes(repositoryPath: string): Promise<Remote[]> {
    return this.gitService.getRemotes(repositoryPath);
  }

  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async isGitRepository(path: string): Promise<boolean> {
    return this.gitService.isGitRepository(path);
  }
}

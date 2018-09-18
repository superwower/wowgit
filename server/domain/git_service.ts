import Remote from "./remote";
import Status from "./status";

/**
 * An interface that access the status of git repository.
 */
export default interface IGitService {
  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  getStatus(repostioryPath: string): Promise<Status>;

  /**
   * Get the remote of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of remote object
   */
  getRemotes(repositoryPath: string): Promise<Remote[]>;

  /**
   * Check if a given path is a valid git repositrory
   * @param { string } path path to git repository path
   * @return { Promise<boolean> } promise of Status object
   */
  isGitRepository(path: string): Promise<boolean>;
}

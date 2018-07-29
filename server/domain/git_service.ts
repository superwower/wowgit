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
}

import GitService from "../domain/git_service";
import Status from "../domain/status";
import File from "../domain/file";
import * as Git from "nodegit";

/**
 * Implementation of GitService with nodegit
 */
export default class NodeGitService implements GitService {
  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async getStatus(repositoryPath: string): Promise<Status> {
    const repo = await Git.Repository.open(repositoryPath);
    const statusFiles = await repo.getStatus();
    const statusDict = {
      new: [],
      modified: [],
      renamed: [],
      deleted: []
    };
    for (let file of statusFiles) {
      if (file.isNew()) {
        statusDict.new.push(new File(file.path()));
      } else if (file.isModified()) {
        statusDict.modified.push(new File(file.path()));
      } else if (file.isRenamed()) {
        statusDict.renamed.push(new File(file.path()));
      } else if (file.isDeleted()) {
        statusDict.deleted.push(new File(file.path()));
      }
    }
    const {
      new: newFiles,
      modified: modifiedFiles,
      renamed: renamedFiles,
      deleted: deletedFiles
    } = statusDict;
    return new Status(newFiles, renamedFiles, modifiedFiles, deletedFiles);
  }
}

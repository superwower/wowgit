import * as Git from "nodegit";

import File from "../domain/file";
import IGitService from "../domain/git_service";
import Remote from "../domain/remote";
import Status from "../domain/status";

/**
 * Implementation of GitService with nodegit
 */
export default class NodeGitService implements IGitService {
  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async getStatus(repositoryPath: string): Promise<Status> {
    const repo = await Git.Repository.open(repositoryPath);
    const statusFiles = await repo.getStatus();
    const statusDict = {
      deleted: [],
      modified: [],
      new: [],
      renamed: []
    };
    for (const file of statusFiles) {
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
  public async getRemote(repositoryPath: string): Promise<Remote> {
    const repo = await Git.Repository.open(repositoryPath);
    const remotes = await repo.getRemotes();
    for (const remote of remotes) {
      new Remote(remote);
    }
  }
}

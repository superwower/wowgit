import * as Git from "nodegit";

import File from "../domain/file";
import IGitService from "../domain/git_service";
import Branch from "../domain/branch";
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

  /**
   * Get remotes of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Remote objects
   */
  public async getRemotes(repositoryPath: string): Promise<Remote[]> {
    const repo = await Git.Repository.open(repositoryPath);
    const remotes = await repo.getRemotes();
    const ret = [];
    for (let name of remotes) {
      const remote = new Remote(name.toString());

      const remoteSvc = await repo.getRemote(name);
      await remoteSvc.connect(
        Git.Enums.DIRECTION.FETCH,
        new Git.RemoteCallbacks()
      );
      const referenceList = await remoteSvc.referenceList();
      referenceList
        .filter(ref => ref.name().startsWith("refs/heads/"))
        .forEach(ret =>
          remote.pushBranch(new Branch(ret.name().replace("refs/heads/", "")))
        );
      ret.push(remote);
    }
    return ret;
  }
}

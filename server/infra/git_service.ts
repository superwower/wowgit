import GitService from "../domain/git_service";
import Status from "../domain/status";
import File from "../domain/file";
import * as Git from "nodegit";

export default class NodeGitService implements GitService {
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
    console.log(statusDict);
    const {
      new: newFiles,
      modified: modifiedFiles,
      renamed: renamedFiles,
      deleted: deletedFiles
    } = statusDict;
    return new Status(newFiles, renamedFiles, modifiedFiles, deletedFiles);
  }
}

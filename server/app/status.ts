import Status from "../domain/status";
import File from "../domain/file";
import * as Git from "nodegit";

import GitService from "../domain/git_service";

export default class StatusService {
  private gitService: GitService;
  constructor(gitService: GitService) {
    this.gitService = gitService;
  }
  public async getStatus(repositoryPath: string): Promise<Status> {
    return this.gitService.getStatus(repositoryPath);
  }
}

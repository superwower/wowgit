import * as fs from "fs";
import * as git from "isomorphic-git";

import File from "../domain/file";
import IGitService from "../domain/git_service";
import Status from "../domain/status";

enum STATUS {
  FILE = 0,
  HEAD = 1,
  WORKDIR = 2,
  STAGE = 3
}

/**
 * Implementation of GitService with nodegit
 */
export default class GitService implements IGitService {
  public constructor() {
    git.plugins.set("fs", fs);
  }
  /**
   * Get the status of a repostiory
   * @param repositoryPath path to git repository path
   * @return promise of Status object
   */
  public async getStatus(repositoryPath: string): Promise<Status> {
    const statuses = await git.statusMatrix({
      dir: repositoryPath,
      pattern: null
    });
    const statusDict = {
      deleted: [],
      modified: [],
      new: []
    };
    for (const status of statuses) {
      if (status[STATUS.HEAD] === 0) {
        statusDict.new.push(new File(status[STATUS.FILE]));
      } else if (status[STATUS.HEAD] === 1 && status[STATUS.WORKDIR] === 2) {
        statusDict.modified.push(new File(status[STATUS.FILE]));
      } else if (status[STATUS.WORKDIR] === 0) {
        statusDict.deleted.push(new File(status[STATUS.FILE]));
      }
    }
    const {
      new: newFiles,
      modified: modifiedFiles,
      deleted: deletedFiles
    } = statusDict;
    return new Status(newFiles, modifiedFiles, deletedFiles);
  }

  /**
   * Check if a given path is a valid git repositrory
   * @param { string } path path to git repository path
   * @return { Promise<boolean> } promise of Status object
   */
  public async isGitRepository(path: string): Promise<boolean> {
    try {
      const gitRoot = await git.findRoot({ filepath: path });
      return gitRoot === path;
    } catch (err) {
      return false;
    }
  }
}

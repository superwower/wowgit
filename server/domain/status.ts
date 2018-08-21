import File from "./file";
/**
 * This class represents the status of a git repository
 */
export default class Status {
  /**
   * List of untracked files
   */
  private _untracked: File[];

  /**
   * List of renamed files
   */
  private _renamed: File[];

  /**
   * List of modified files
   */
  private _modified: File[];

  /**
   * List of deleted files
   */
  private _deleted: File[];

  /**
   * @param untracked Array of untracked file
   * @param renamaed Array of renamed file
   * @param modified Array of modified file
   * @param deleted Array of deleted file
   */
  constructor(
    untracked: File[],
    renamed: File[],
    modified: File[],
    deleted: File[]
  ) {
    this._untracked = untracked;
    this._renamed = renamed;
    this._modified = modified;
    this._deleted = deleted;
  }

  /**
   * @return Array of untracked files
   */
  get untracked(): File[] {
    return this._untracked;
  }

  /**
   * @return Array of renamed files
   */
  get renamed(): File[] {
    return this._renamed;
  }

  /**
   * @return Array of modified files
   */
  get modified(): File[] {
    return this._modified;
  }

  /**
   * @return Array of deleted files
   */
  get deleted(): File[] {
    return this._deleted;
  }
}

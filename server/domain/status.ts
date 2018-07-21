export default class Status {
  private _untracked: File[];
  private _renamed: File[];
  private _modified: File[];
  private _deleted: File[];

  constructor(untracked, renamed, modified, deleted) {
    this._untracked = untracked;
    this._renamed = renamed;
    this._modified = modified;
    this._deleted = deleted;
  }

  get untracked(): File[] {
    return this._untracked;
  }

  get renamed(): File[] {
    return this._renamed;
  }

  get modified(): File[] {
    return this._modified;
  }

  get deleted(): File[] {
    return this._deleted;
  }
}

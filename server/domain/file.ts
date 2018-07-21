export default class File {
  private _path: string;

  constructor(path: string) {
    this._path = path;
  }

  get path(): string {
    return this._path;
  }
}

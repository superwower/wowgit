/**
 * This class represents a directory or file
 */
export default class File {
  /**
   * Path to a directory or file
   */
  private _path: string;

  /**
   * @param path Path to a directory or file
   */
  constructor(path: string) {
    this._path = path;
  }

  /**
   * @return Path to a directory or file
   */
  get path(): string {
    return this._path;
  }
}

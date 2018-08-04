/**
 * This class represents the remote of a git repository
 */
export default class Remote {
  /**
   * Remote name
   */
  private _name: string;

  /**
   * @param name Remote name
   */
  constructor(name: string) {
    this._name = name;
  }

  /**
   * @return Remote name
   */
  get name(): string {
    return this._name;
  }
}

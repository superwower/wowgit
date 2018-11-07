/**
 * This class represents the branch of a git repository
 */
export default class Branch {
  /**
   * Branch name
   */
  private _name: string;

  /**
   * @param name Branch name
   */
  constructor(name: string) {
    this._name = name;
  }

  /**
   * @return Branch name
   */
  get name(): string {
    return this._name;
  }
}

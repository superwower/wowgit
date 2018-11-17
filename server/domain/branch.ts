/**
 * This class represents a branch
 */
export default class Branch {
  /**
   * Name of branch
   */
  private _name: string;

  /**
   * @param {string} name of branch
   */
  constructor(name: string) {
    this._name = name;
  }

  /**
   * @return {string} name of branch
   */
  get name(): string {
    return this._name;
  }
}

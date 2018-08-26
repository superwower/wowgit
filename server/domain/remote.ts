import Branch from "./branch";

/**
 * This class represents the remote of a git repository
 */
export default class Remote {
  /**
   * Remote name
   */
  private _name: string;

  /**
   * Remote branches
   */
  private _branches: Branch[];

  /**
   * @param name Remote name
   */
  constructor(name: string, branches: Branch[] = []) {
    this._name = name;
    this._branches = branches;
  }

  /**
   * @return Remote name
   */
  get name(): string {
    return this._name;
  }

  /**
   * @return Remote branches
   */
  get branches(): Branch[] {
    return this._branches;
  }

  /**
   * @return Remote branches
   */
  pushBranch(branch: Branch) {
    this._branches.push(branch);
  }
}

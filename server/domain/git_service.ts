import Status from "./status";
export default interface GitService {
  getStatus(repostioryPath: string): Promise<Status>;
}

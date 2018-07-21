import Status from "../domain/status";
import File from "../domain/file";

export default class StatusService {
  public getStatus(): Status {
    return new Status([new File("/home/hitochan/hoge.ts")], [], [], []);
  }
}

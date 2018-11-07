import authorResolvers from "./author";
import remoteResolvers from "./remote";
import rootResolvers from "./root";
import statusResolvers from "./status";

export default [
  rootResolvers,
  authorResolvers,
  statusResolvers,
  remoteResolvers
];

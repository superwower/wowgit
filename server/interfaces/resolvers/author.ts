import { IResolvers } from "graphql-tools";
const author: IResolvers = {
  Author: {
    name({ name }, args, context, info) {
      return name;
    },
    email({ email }, args, context, info) {
      return email;
    }
  }
};

export default author;

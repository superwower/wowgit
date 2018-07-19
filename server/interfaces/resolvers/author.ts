export default {
  Author: {
    name({ name }, args, context, info) {
      return name;
    },
    email({ email }, args, context, info) {
      return email;
    }
  }
};

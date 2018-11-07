export default {
  Remote: {
    name({ name }, args, context, info) {
      return name;
    },
    branches({ branches }, args, context, info) {
      return branches;
    }
  }
};

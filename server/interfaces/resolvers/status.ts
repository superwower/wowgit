export default {
  Status: {
    untracked({ untracked }, args, context, info) {
      return untracked;
    },
    modified({ modified }, args, context, info) {
      return modified;
    },
    deleted({ deleted }, args, context, info) {
      return deleted;
    }
  }
};

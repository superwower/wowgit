export default {
  Query: {
    repos: (obj, args, context, info) => {
      console.log("hoge");
      return [];
    },
    currentRepo: (obj, args, context, info) => {
      console.log("currentRepo");
      return null;
    }
  },
  Repository: {
    name: ({ name }, args, context, info) => {
      return name;
    },
    src: ({ src }, args, context, info) => {
      return src;
    }
  }
};

module.exports = (fastify, opts, next) => {
  fastify.get('/', (req, res) => {
    res.send('hello');
  });
  next();
};

module.exports = function(fastify, opts, next) {
  fastify.get('/api', (req, res) => {
    res.send('hello');
  });
  next();
};

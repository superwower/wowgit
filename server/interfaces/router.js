const {parse} = require('url');

const registerRoutes = (server, next) => {
  const nextHandler = next.getRequestHandler();
  server.register(require('./api'), {prefix: '/api'});
  server.all('/*', (req, res) => {
    const parsedUrl = parse(req.req.url, true);
    nextHandler(req.req, res.res, parsedUrl);
  });
};

module.exports = registerRoutes;

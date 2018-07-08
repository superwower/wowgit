import {parse} from 'url';

export const registerRoutes = (server, next) => {
  const nextHandler = next.getRequestHandler();
  server.register(require('./api'), {prefix: '/api'});
  server.all('/*', (req, res) => {
    const parsedUrl = parse(req.req.url, true);
    nextHandler(req.req, res.res, parsedUrl);
  });
};


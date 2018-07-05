const fastify = require('fastify')({
  logger: true,
});
const {createServer} = require('http');
const {parse} = require('url');

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const main = async () => {
  await app.prepare();
  fastify.register(require('./api', {prefix: '/api'}));
  fastify.all('/*', (req, res) => {
    console.log(req.req.url);
    const parsedUrl = parse(req.req.url, true);
    handle(req.req, res.res, parsedUrl);
  });
  fastify.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
};

main();

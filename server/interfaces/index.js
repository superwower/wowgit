const Fastify = require('fastify');
const Next = require('next');
const registerRoutes = require('./router');

const dev = process.env.NODE_ENV !== 'production';
const next = Next({dev});

class Server {
  constructor(logger = true, port = 3000) {
    this.logger = logger;
    this.port = port;
  }
  async start() {
    const fastify = Fastify({
      logger: this.logger,
    });
    await next.prepare();
    registerRoutes(fastify, next);
    fastify.listen(this.port, err => {
      if (err) {
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  }
}

module.exports = Server;

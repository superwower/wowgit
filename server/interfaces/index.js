const Fastify = require('fastify');
const Next = require('next');
const registerRoutes = require('./router');

const dev = process.env.NODE_ENV !== 'production';
const next = Next({dev});

class Server {
  constructor(logger = true, address='0.0.0.0', port = 3000) {
    this.logger = logger;
    this.port = port;
    this.address = address;
  }
  async start() {
    const fastify = Fastify({
      logger: this.logger,
    });
    await next.prepare();
    registerRoutes(fastify, next);
    fastify.listen(this.port, this.address, (err, address) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://:${address}`);
    });
  }
}

module.exports = Server;

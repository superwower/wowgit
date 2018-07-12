const Fastify = require('fastify');
const Next = require('next');
const registerRoutes = require('./router');


class Server {
  constructor(logger=true, port=3000, address='0.0.0.0', dev=process.env.NODE_ENV !== 'production') {
    this.logger = logger;
    this.port = port;
    this.address = address;
    this.dev = dev
  }
  async start() {
    const next = Next({dev:this.dev});
    const fastify = Fastify({
      logger: this.logger,
    });
    await next.prepare();
    registerRoutes(fastify, next);
    fastify.listen(this.port, this.address, (err, address) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://${address}`);
    });
  }
}

module.exports = Server;

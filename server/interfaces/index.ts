import * as Fastify from "fastify";
import * as Next from "next";
import { registerRoutes } from "./router";

const dev = process.env.NODE_ENV !== "production";
const next = Next({ dev });

export class Server {
  options: Fastify.ServerOptions;
  address: string;
  port: number;
  constructor(options = { logger: true }, address = "0.0.0.0", port = 3000) {
    this.options = options;
    this.port = port;
    this.address = address;
  }
  async start() {
    const fastify = Fastify(this.options);
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

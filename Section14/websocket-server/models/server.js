import express from "express";
import cors from "cors";
import { Server as socketServer } from "socket.io";
import { createServer } from "http";

import { socketController } from "../sockets/controller.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = createServer(this.app);
    this.io = new socketServer(this.server);

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Socket event setup
    this.sockets();
  }

  init() {
    this.server.listen(this.port, () => {
      console.log(`App started. Listening on port ${this.port}`);
    });
  }

  middlewares() {
    // CORS
    // TODO PRODUCTION: CHANGE CORS OPTIONS
    this.app.use(
      cors({
        origin: `http://localhost`,
      })
    );

    // Public directory
    this.app.use(express.static("public"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  routes() {}
}

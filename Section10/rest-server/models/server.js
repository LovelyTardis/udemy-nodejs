import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";
import { dbConnection } from "../database/config.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersRoutePath = "/api/users";

    // Connect to mongodb
    this.mongoConnect();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  setup() {
    this.app.listen(this.port, () => {
      console.log(`App started. Listening on port ${this.port}`);
    });
  }

  mongoConnect() {
    dbConnection();
  }

  middlewares() {
    // CORS
    // TODO PRODUCTION: CHANGE CORS OPTIONS
    this.app.use(
      cors({
        origin: `http://localhost`,
      })
    );

    // Read and parse body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    // User routes
    this.app.use(this.usersRoutePath, userRoutes);
  }
}

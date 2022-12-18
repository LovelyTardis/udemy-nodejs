import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersRoutePath = "/api/users";

    // TODO PRODUCTION: CHANGE CORS OPTIONS
    this.corsOptions = {
      origin: `http://localhost`,
    };

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

  middlewares() {
    // CORS
    this.app.use(cors(this.corsOptions));

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

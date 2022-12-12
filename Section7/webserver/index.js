import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import hbs from "hbs";
import dotenv from "dotenv";

// Custom and .env variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const username = "LovelyTardis";

// Express app setup
const app = express();
const port = process.env.PORT | 8080;

// HBS setup
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// Static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    username,
    title: "Node - HOME",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    username,
    title: "Node - GENERIC",
  });
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    username,
    title: "Node - ELEMENTS",
  });
});

app.get("*", (req, res) => {
  const url = req.url;
  console.error(`ERROR: '${url}' not found`);
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import { createTableFile } from "./helpers/multiplication.js";

console.clear();

const base = 4;

createTableFile(base)
    .then((fileName) => console.log(`${fileName} created!`))
    .catch((err) => console.log(err));

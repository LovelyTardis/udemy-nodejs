import fs from "fs";

const dbPath = "./db/history.json";

export const loadDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, { encoding: "utf-8" });
    const { history } = JSON.parse(data);
    return history;
  } catch (error) {
    return [];
  }
};

export const saveDatabase = (data) => {
  const payload = {
    history: data,
  };
  fs.writeFileSync(dbPath, JSON.stringify(payload), { encoding: "utf-8" });
};

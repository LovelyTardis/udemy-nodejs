import fs from "fs";

const filePath = "./db/data.json";

export const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

export const loadData = () => {
    if (!fs.existsSync(filePath)) return;
    const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
    return data;
};

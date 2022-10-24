import fs from "fs";

export const createTableFile = async (base = 1) => {
    console.log("================\nMultiplier table\n================");

    const fileName = `table-${base}.txt`;
    let responseString = "";

    try {
        for (let i = 1; i <= 10; i++) {
            responseString += `${base} x ${i} = ${base * i}\n`;
        }
        console.log(responseString);
        fs.writeFileSync(`tables/${fileName}`, responseString);
        return fileName;
    } catch (error) {
        throw error;
    }
};

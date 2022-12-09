import * as dotenv from 'dotenv'
import { inquirerMenu, pause, readInput, locationList } from "./helpers/inquirer.js";
import Search from "./models/search.js";

const main = async () => {
    dotenv.config();
    let opt;
    const search = new Search();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const locationSearch = await readInput('City to search: ');

                const locations = await search.locations(locationSearch);

                const selectedId = await locationList(locations);

                if (selectedId === '0') continue;

                const { name, lat, lng } = locations.find(l => l.id === selectedId);
                search.addHistory(name);
                const { desc: climate, min, max, temp } = await search.weatherByLocation(lat, lng);

                console.log("\nCity information".green);
                console.table({
                    City: name,
                    Latitude: lat,
                    Longitude: lng,
                    Climate: climate,
                    Temperature: `${temp}ºC`,
                    "Minimum Temperature": `${min}ºC`,
                    "Maximum Temperature": `${max}ºC`,
                });
                break;
            case 2:
                search.showHistory();
                break;
        }
        opt !== 0 && await pause();
    } while (opt !== 0)
}


main();
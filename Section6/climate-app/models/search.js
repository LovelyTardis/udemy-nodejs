import colors from "colors";
import axios from "axios";
import { loadDatabase, saveDatabase } from "../helpers/database.js";

export default class Search {
    limit = 5;
    language = "en";
    history = [];
    mapboxToken = process.env.MAPBOX_TOKEN;
    openweatherToken = process.env.OPENWEATHER_TOKEN;

    constructor() {
        this.history = loadDatabase();
    }

    get paramsMapBox() {
        return {
            "access_token": this.mapboxToken,
            "limit": this.limit,
            "language": this.language,
        }
    }

    async locations( location = "" ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            const data = resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));

            return data;
        }
        catch (error) {
            console.log(`ERROR: ${error}`.red);
            return [];
        }
    }

    async weatherByLocation( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    "lat": lat,
                    "lon": lon,
                    "appid": this.openweatherToken,
                    "units": "metric",
                    "lang": this.language,
                }
            });

            const resp = await instance.get();
            console.log(resp.data);
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        }
        catch (error) {
            console.log(`${error}`.red);
        }
    }

    async addHistory( location = "" ) {
        if(this.history.includes( location )) return;
        this.history.unshift( location );
        saveDatabase(this.history);
    }
    
    showHistory() {
        if (this.history.length === 0) {
            console.log("No history yet".red);
            return;
        }
        this.history = this.history.splice(0, 5);
        this.history.forEach( (location, id) => {
            const idx = `${id + 1}.`.green;
            console.log(`${idx} ${location}`);
        })
    }
}
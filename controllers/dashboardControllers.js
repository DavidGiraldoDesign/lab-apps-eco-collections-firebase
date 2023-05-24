import { fs } from "../dependencies.js";
import * as KPI from "./kpiCalculations.js";

export const getData = (req, res) => {
    try {
        // read existing data from users.json file
        const usersJSONData = fs.readFileSync('./localCollection/users.json');
        const interactionsJSONData = fs.readFileSync('./localCollection/interactions.json');

        const { users } = JSON.parse(usersJSONData);
        const { interactions } = JSON.parse(interactionsJSONData);

        const osPopulatiry = KPI.getOSPopularity(interactions);
        const lastFiveLeads = KPI.getLastFiveLeads(users);
        const visitsByHour = KPI.getVisitsByHour(interactions);
        const visitsByDay = KPI.getVisitsByDay(interactions);
        const convertionRate = KPI.getConvertionRate(interactions, users);


        let dashboardData = { osPopulatiry, lastFiveLeads, visitsByHour, visitsByDay, convertionRate };
        res.send(dashboardData);
        
    } catch (error) {
        console.error(error); // handle any errors that occur
        res.status(500).send('Error reading JSON data');
    }
}


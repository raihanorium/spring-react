import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Trip} from "../../model/Trip";
import {TripService} from "../TripService";

export class TripServiceImpl implements TripService {
    constructor() {
    }

    async getTrips(): Promise<Page<Trip>> {
        return await fetch(Paths.TRIPS).then(async response => {
            if (response.ok) {
                const json = await response.json();
                const trips = json.data.content.map((trip: any) => new Trip(trip.id, trip.company.name, trip.cargo.name, new Date(trip.startDate), new Date(trip.endDate), trip.from, trip.to, trip.rent));
                return new Page<Trip>(trips, json.data.number, json.data.size, json.data.totalElements);
            } else {
                throw new Error("Failed to fetch trips");
            }
        });
    }

    async saveTrip(trip: Trip): Promise<Trip> {
        return await fetch(Paths.TRIPS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trip)
        }).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Trip(json.data.id, json.data.company.name, json.data.cargo.name, json.data.startDate, json.data.endDate, json.data.from, json.data.to, json.data.rent);
            } else {
                throw new Error("Failed to save trip");
            }
        });
    }
}
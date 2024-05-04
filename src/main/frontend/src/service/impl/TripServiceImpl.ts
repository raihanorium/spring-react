import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Trip} from "../../model/Trip";
import {TripService} from "../TripService";
import {PageParams} from "../../model/PageParams";

export class TripServiceImpl implements TripService {
  constructor() {
  }

  async getTrips(params: PageParams): Promise<Page<Trip>> {
    const url = params.isNotBlank() ? `${Paths.TRIPS}?${params.toParamsString()}` : Paths.TRIPS;
    return await this.getTripsPage(url);
  }

  async getTripsByCargo(cargoId: number, page?: number): Promise<Page<Trip>> {
    const url = page ? `${Paths.TRIPS}/cargo/${cargoId}?page=${page}` : `${Paths.TRIPS}/cargo/${cargoId}`;
    return await this.getTripsPage(url);
  }

  private async getTripsPage(url: string) {
    return await fetch(url).then(async response => {
      if (response.ok) {
        const json = await response.json();
        const trips = json.data.content.map((trip: any) => new Trip(trip.id, trip.company.id, trip.company.name, trip.cargo.id, trip.cargo.name, trip.startDate ? new Date(trip.startDate) : null, trip.endDate ? new Date(trip.endDate) : null, trip.from, trip.to, trip.rent));
        return new Page<Trip>(trips, json.data.number, json.data.size, json.data.totalElements);
      } else {
        throw new Error("Failed to fetch trips");
      }
    });
  }

  async getTrip(id: number): Promise<Trip> {
    return await fetch(`${Paths.TRIPS}/${id}`).then(async response => {
      if (response.ok) {
        const json = await response.json();
        const startDate = json.data?.startDate ? new Date(json.data.startDate) : null;
        const endDate = json.data?.endDate ? new Date(json.data.endDate) : null;
        return new Trip(json.data.id, json.data.company?.id, json.data.company?.name, json.data.cargo?.id, json.data.cargo?.name, startDate, endDate, json.data.from, json.data.to, json.data.rent);
      } else {
        throw new Error("Failed to fetch trip");
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
        return new Trip(json.data.id, json.data.company.id, null, json.data.cargo.id, null, json.data.startDate, json.data.endDate, json.data.from, json.data.to, json.data.rent);
      } else {
        throw new Error("Failed to save trip");
      }
    });
  }
}
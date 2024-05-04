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
        const trips = json.data.content.map((trip: any) => this.buildObject(trip));
        return new Page<Trip>(trips, json.data.number, json.data.size, json.data.totalElements);
      } else {
        throw new Error("Failed to fetch trips");
      }
    });
  }

  private buildObject(json: any) {
    return new Trip(json.id,
        json.company.id,
        json.company.name,
        json.cargo.id,
        json.cargo.name,
        json.startDate ? new Date(json.startDate) : null,
        json.endDate ? new Date(json.endDate) : null,
        json.from,
        json.to,
        json.rent,
        json.companyRent,
        json.load,
        json.rate,
        json.shortage,
        json.shortageRate);
  }

  async getTrip(id: number): Promise<Trip> {
    return await fetch(`${Paths.TRIPS}/${id}`).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return this.buildObject(json.data);
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
        return this.buildObject(json.data);
      } else {
        throw new Error("Failed to save trip");
      }
    });
  }
}
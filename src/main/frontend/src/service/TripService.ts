import {Page} from "../model/Page";
import {Trip} from "../model/Trip";
import {PageParams} from "../model/PageParams";

export interface TripService {
  getTrips(page: PageParams): Promise<Page<Trip>>;

  getTripsByCargo(cargoId: number, page?: number): Promise<Page<Trip>>;

  getTrip(id?: number): Promise<Trip>

  saveTrip(trip: Trip): Promise<Trip>;
}
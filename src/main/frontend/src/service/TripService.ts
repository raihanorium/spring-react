import {Page} from "../model/Page";
import {Trip} from "../model/Trip";

export interface TripService {
  getTrips(page?: number): Promise<Page<Trip>>;

  getTrip(id?: number): Promise<Trip>

  saveTrip(trip: Trip): Promise<Trip>;
}
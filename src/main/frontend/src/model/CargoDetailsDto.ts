import {Cargo} from "./Cargo";

export class CargoDetailsDto {
  public constructor(
      public cargo: Cargo | null,
      public totalRent: number | null,
      public totalReturn: number | null,
      public totalPaid: number | null,
      public balance: number | null,
  ) {
  }
}
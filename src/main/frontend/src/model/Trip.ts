import DateUtils from "../utils/DateUtils";

export class Trip {

  public static from(formData: FormData): Trip {
    return new Trip(
        formData.get("id") as number | null,
        formData.get("companyId") as number | null,
        formData.get("companyTitle") as string | null,
        formData.get("cargoId") as number | null,
        formData.get("cargoTitle") as string | null,
        new Date(Date.parse(formData.get("startDate") as string)),
        new Date(Date.parse(formData.get("endDate") as string)),
        formData.get("from") as string | null,
        formData.get("to") as string | null,
        formData.get("rent") as number | null,
    );
  }

  public toObject() {
    return {
      companyId: this.companyId,
      companyTitle: this.companyTitle,
      cargoId: this.cargoId,
      cargoTitle: this.cargoTitle,
      startDate: this.startDate,
      endDate: this.endDate,
      from: this.from,
      to: this.to,
      rent: this.rent,
    };
  }

  public getLabel(): string {
    return this.cargoTitle + "-" + this.from + "-" + this.to + "-" + DateUtils.toString(this.startDate);
  }

  public constructor(
      public id: number | null,
      public companyId: number | null,
      public companyTitle: string | null,
      public cargoId: number | null,
      public cargoTitle: string | null,
      public startDate: Date | null,
      public endDate: Date | null,
      public from: string | null,
      public to: string | null,
      public rent: number | null,
  ) {
  }
}
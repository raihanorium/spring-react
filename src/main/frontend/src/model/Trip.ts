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
        formData.get("companyRent") as number | null,
        formData.get("load") as number | null,
        formData.get("rate") as number | null,
        formData.get("shortage") as number | null,
        formData.get("shortageRate") as number | null,
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
      companyRent: this.companyRent,
      load: this.load,
      rate: this.rate,
      shortage: this.shortage,
      shortageRate: this.shortageRate,
    };
  }

  public getLabel(): string {
    return this.cargoTitle + "-" + this.from + "-" + this.to + "-" + DateUtils.toString(this.startDate);
  }

  public getTotalCost(): number {
    return ((this.load || 0) * (this.rate || 0)) - ((this.shortage || 0) * (this.shortageRate || 0));
  }

  public getNetProfit(): number {
    return (this.companyRent || 0) - this.getTotalCost();
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
      public companyRent: number | null,
      public load: number | null,
      public rate: number | null,
      public shortage: number | null,
      public shortageRate: number | null,
  ) {
  }
}
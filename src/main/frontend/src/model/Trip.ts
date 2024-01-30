export class Trip {

  public static from(formData: FormData): Trip {
    return new Trip(
        formData.get("id") as string | null,
        formData.get("companyId") as string | null,
        formData.get("cargoId") as string | null,
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
      cargoId: this.cargoId,
      startDate: this.startDate,
      endDate: this.endDate,
      from: this.from,
      to: this.to,
      rent: this.rent,
    };
  }

  public constructor(
      public id: string | null,
      public companyId: string | null,
      public cargoId: string | null,
      public startDate: Date | null,
      public endDate: Date | null,
      public from: string | null,
      public to: string | null,
      public rent: number | null,
  ) {
  }
}
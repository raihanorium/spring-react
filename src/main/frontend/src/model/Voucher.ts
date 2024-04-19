export class Voucher {

  public static from(formData: FormData): Voucher {
    return new Voucher(
        formData.get("id") as string | null,
        formData.get("cargoId") as string | null,
        formData.get("tripId") as string | null,
        formData.get("voucherNo") as string | null,
        new Date(Date.parse(formData.get("date") as string)),
        formData.get("dr") as number | null,
        formData.get("cr") as number | null,
        formData.get("particular") as string | null,
    );
  }

  public toObject() {
    return {
      id: this.id,
      cargoId: this.cargoId,
      tripId: this.tripId,
      voucherNo: this.voucherNo,
      date: this.date,
      dr: this.dr,
      cr: this.cr,
      particular: this.particular,
    };
  }

  public constructor(
      public id: string | null,
      public cargoId: string | null,
      public tripId: string | null,
      public voucherNo: string | null,
      public date: Date | null,
      public dr: number | null,
      public cr: number | null,
      public particular: string | null,
  ) {
  }
}
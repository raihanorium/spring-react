export class Cargo {

  public static from(formData: FormData): Cargo {
    return new Cargo(
        formData.get("id") as string | null,
        formData.get("name") as string | null,
        formData.get("proprietor") as string | null,
        formData.get("contactNo") as string | null,
        formData.get("address") as string | null,
        formData.get("reference") as string | null,
    );
  }

  public toObject() {
    return {
      name: this.name,
      proprietor: this.proprietor,
      contactNo: this.contactNo,
      address: this.address,
      reference: this.reference,
    };
  }

  public constructor(
      public id: string | null,
      public name: string | null,
      public proprietor: string | null,
      public contactNo: string | null,
      public address: string | null,
      public reference: string | null,
  ) {
  }
}
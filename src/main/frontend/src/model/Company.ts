export class Company {

  public static from(formData: FormData): Company {
    return new Company(
        formData.get("id") as number | null,
        formData.get("companyName") as string | null,
        formData.get("contactPerson") as string | null,
        formData.get("contactNo") as string | null,
        formData.get("officeAddress") as string | null,
    );
  }

  public toObject() {
    return {
      name: this.name,
      contactPerson: this.contactPerson,
      contactNo: this.contactNo,
      officeAddress: this.officeAddress,
    };
  }

  public constructor(
      public id: number | null,
      public name: string | null,
      public contactPerson: string | null,
      public contactNo: string | null,
      public officeAddress: string | null,
  ) {
  }
}
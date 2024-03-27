export class ImportForm {

  public static from(formData: FormData): ImportForm {
    return new ImportForm(
        formData.get("import-file") as object | null
    );
  }

  public toObject() {
    return {
      importFile: this.importFile,
    };
  }

  public constructor(
      public importFile: object | null,
  ) {
  }
}
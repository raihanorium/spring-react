export class ImportForm {

  public static from(formData: FormData): ImportForm {
    return new ImportForm(
        formData.get("import-file") as object | null,
        'test',
    );
  }

  public toObject() {
    return {
      importFile: this.file,
    };
  }

  public constructor(
      public file: object | null,
      public fileName: string | null,
  ) {
  }
}
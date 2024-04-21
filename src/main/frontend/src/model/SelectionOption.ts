export class SelectionOption {
  label: string | null;
  value: number | null;

  constructor(label: string | null,
              value: number | null
  ) {
    this.label = label;
    this.value = value;
  }

  static from(label: string | null,
              value: number | null
  ): SelectionOption {
    return new SelectionOption(label, value);
  }
}

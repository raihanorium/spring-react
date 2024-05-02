export class PageParams {

  static nullObject(): PageParams {
    return new PageParams('', 0, 10, 'id', 'asc');
  }

  static fromSearch(search: string) {
    return new PageParams(search, 0, 10, 'id', 'asc');
  }

  constructor(
      public search?: string,
      public page?: number,
      public size?: number,
      public sort?: string,
      public direction?: string,
  ) {
  }

  toParamsString(): string {
    const params: string[] = [];
    if (this.search) params.push(`search=${encodeURIComponent(this.search)}`);
    if (this.page !== undefined) params.push(`page=${this.page}`);
    if (this.size !== undefined) params.push(`size=${this.size}`);
    if (this.sort) params.push(`sort=${this.sort}`);
    if (this.direction) params.push(`direction=${this.direction}`);
    return params.join('&');
  }

  isNotBlank(): boolean {
    return (
        this.search !== null && this.search !== undefined && this.search.trim() !== '' ||
        this.page !== null && this.page !== undefined ||
        this.size !== null && this.size !== undefined ||
        this.sort !== null && this.sort !== undefined && this.sort.trim() !== '' ||
        this.direction !== null && this.direction !== undefined && this.direction.trim() !== ''
    );
  }
}
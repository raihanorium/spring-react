export class Page<T> {
    static nullObject<U>(): Page<U> {
        return new Page([], 0, 0, 0);
    }

    constructor(
        public content: T[],
        public number: number,
        public size: number,
        public totalElements: number
    ) {
    }
}
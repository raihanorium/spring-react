export default class DateUtils {
  public static toString(date: Date | null): string {
    if (!date) {
      return '';
    }

    let year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    let month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    let day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    return (`${day}-${month}-${year}`);
  }
}
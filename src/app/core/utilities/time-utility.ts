export class TimeUtility {
  static toHoursMinutesFormat(minutes: number): string {
    return (
      (minutes > 0 ? '+' : '-') +
      ('0' + Math.floor(Math.abs(minutes / 60))).slice(-2) +
      ':' +
      ('0' + (Math.abs(minutes) % 60)).slice(-2)
    );
  }
}

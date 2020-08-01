export class DateUtility {
  static fromUNIXEpochDate(UNIXEpoch: number): Date {
    return new Date(+UNIXEpoch * 1000);
  }

  static toUNIXEpochDate(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }
}

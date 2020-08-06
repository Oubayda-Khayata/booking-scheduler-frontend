export class DateUtility {
  static fromUNIXEpochDate(UNIXEpoch: number): Date {
    return new Date(+UNIXEpoch * 1000);
  }

  static toUNIXEpochDate(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  static changeTimezone(date: Date, timezone: string) {
    const otherDate = new Date(date.toLocaleString('en-US', {
      timeZone: timezone
    }));

    const difference = date.getTime() - otherDate.getTime();

    return new Date(date.getTime() + difference);
  }
}

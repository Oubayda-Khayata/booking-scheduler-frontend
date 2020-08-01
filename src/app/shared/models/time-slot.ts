import { Deserializable } from './deserializable';
export class TimeSlot implements Deserializable {
  dateTime: number;
  fromTime: string;
  toTime: string;

  deserialize(input: any): this {
    this.dateTime = input.datetime;
    this.fromTime = input.from_time;
    this.toTime = input.to_time;
    return this;
  }
}

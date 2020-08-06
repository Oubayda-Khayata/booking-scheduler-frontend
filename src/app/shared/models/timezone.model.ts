import { TimeUtility } from './../../core/utilities/time-utility';
import { Deserializable } from './deserializable';
export class Timezone implements Deserializable {
  name: string;
  utcOffset: number; // in minutes
  deserialize(input: any): this {
    this.name = input.name;
    this.utcOffset = input.utc_offset;
    return this;
  }
  toString(): string {
    const gmtOffset: string = `GMT${TimeUtility.toHoursMinutesFormat(this.utcOffset)}`;
    return `(${gmtOffset}) ${this.name}`;
  }
}

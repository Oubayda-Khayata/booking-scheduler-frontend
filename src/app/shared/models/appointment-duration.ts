import { Deserializable } from './deserializable';
export class AppointmentDuration implements Deserializable{
  id: number;
  name: string;
  durationInMinutes: number;

  deserialize(input: any): this {
    this.id = input.id;
    this.name = input.name;
    this.durationInMinutes = input.duration_in_minutes;
    return this;
  }
}

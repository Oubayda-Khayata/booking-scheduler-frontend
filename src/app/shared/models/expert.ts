import { Deserializable } from './deserializable';
export class Expert implements Deserializable {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  expertise: string;
  country: string;
  dailyWorkingHoursFrom: string;
  dailyWorkingHoursTo: string;

  deserialize(input: any): this {
    this.id = input.id;
    this.firstname = input.firstname;
    this.lastname = input.lastname;
    this.gender = input.gender;
    this.expertise = input.expertise;
    this.country = input.country;
    this.dailyWorkingHoursFrom = input.daily_working_time_from;
    this.dailyWorkingHoursTo = input.daily_working_time_to;
    return this;
  }
}

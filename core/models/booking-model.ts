import { ISeat } from "./seat-model";

export interface IBooking extends ISeat {
  mName: string;
  ageRestriction: number;
  rName: string;
  format: string;
  seshId: number;
  date: Date;
}

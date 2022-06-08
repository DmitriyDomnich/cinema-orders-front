import { IGenre } from "./genre-model";
import { IStaff } from "./staff-model";

export interface IMovie {
  id: string;
  name: string;
  releaseDate?: Date;
  duration: number;
  country?: string;
  ageRestriction: number;
  coverUrl: string;
  genres: IGenre[];
  directors?: IStaff<"Director">[];
}

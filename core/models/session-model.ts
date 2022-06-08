import { IMovie } from "./movie-model";

export interface ISession {
  id: string;
  date: Date;
  movie: IMovie;
}
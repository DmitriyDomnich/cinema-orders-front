export interface IStaff<T extends "Director" | "Actor"> {
  id: string;
  name: string;
  role: T;
}

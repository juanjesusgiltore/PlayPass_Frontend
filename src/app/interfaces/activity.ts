import { Sesion } from "./sesion";

export interface Activity {
  id: number;

  name: string;

  description: string;

  image:string;

  places: number;

  sesions: Sesion[];
};
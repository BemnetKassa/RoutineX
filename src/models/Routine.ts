export type RoutineType =
  | "gym"
  | "study"
  | "reading"
  | "other"
  | "habits"
  | "general";

export type RoutineDetails = Record<string, string>;

export interface Routine {
  id: number;
  title: string;
  description: string;
  time: string;
  routineType: RoutineType;
  detailsJson: string | null;
  details?: RoutineDetails;
}

import { Routine, RoutineDetails, RoutineType } from "../models/Routine";
import { db } from "./database";

type AddRoutineOptions = {
  routineType?: RoutineType;
  details?: RoutineDetails;
};

const serializeDetails = (details?: RoutineDetails) => {
  if (!details) return null;
  const cleanedEntries = Object.entries(details).filter(
    ([, value]) => value.trim().length > 0,
  );
  if (cleanedEntries.length === 0) return null;
  return JSON.stringify(Object.fromEntries(cleanedEntries));
};

const parseRoutineRow = (row: Omit<Routine, "details">): Routine => {
  let details: RoutineDetails | undefined;

  if (row.detailsJson) {
    try {
      const parsed = JSON.parse(row.detailsJson) as unknown;
      if (parsed && typeof parsed === "object") {
        details = parsed as RoutineDetails;
      }
    } catch {
      details = undefined;
    }
  }

  return {
    ...row,
    routineType: (row.routineType ?? "general") as RoutineType,
    details,
  };
};

export const addRoutine = (
  title: string,
  description: string,
  time: string,
  onSuccess?: () => void,
  options?: AddRoutineOptions,
) => {
  try {
    const routineType = options?.routineType ?? "general";
    const detailsJson = serializeDetails(options?.details);

    db.runSync(
      "INSERT INTO routines (title, description, time, routineType, detailsJson) VALUES (?, ?, ?, ?, ?)",
      [title, description, time, routineType, detailsJson],
    );
    console.log("Routine added");
    onSuccess?.();
  } catch (error) {
    console.log("Insert error:", error);
  }
};

export const getRoutines = (setData: (data: Routine[]) => void) => {
  try {
    const rows = db.getAllSync<Omit<Routine, "details">>(
      `SELECT id, title, description, time, COALESCE(routineType, 'general') as routineType, detailsJson
       FROM routines
       ORDER BY id DESC`,
    );
    setData(rows.map(parseRoutineRow));
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

export const deleteRoutine = (id: number, onSuccess?: () => void) => {
  try {
    db.runSync("DELETE FROM routines WHERE id = ?", [id]);
    console.log("[RoutineX] Deleted");
    onSuccess?.();
  } catch (error) {
    console.log("Delete error:", error);
  }
};

export const updateRoutine = (
  id: number,
  title: string,
  description: string,
  time: string,
  onSuccess?: () => void,
  options?: AddRoutineOptions,
) => {
  try {
    const routineType = options?.routineType ?? "general";
    const detailsJson = serializeDetails(options?.details);

    db.runSync(
      `UPDATE routines
       SET title = ?, description = ?, time = ?, routineType = ?, detailsJson = ?
       WHERE id = ?`,
      [title, description, time, routineType, detailsJson, id],
    );
    console.log("[RoutineX] Updated");
    onSuccess?.();
  } catch (error) {
    console.log("Update error:", error);
  }
};

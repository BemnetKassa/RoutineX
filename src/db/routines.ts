import { Routine } from "../models/Routine";
import { db } from "./database";

export const addRoutine = (
  title: string,
  description: string,
  time: string,
  onSuccess?: () => void,
) => {
  try {
    db.runSync(
      "INSERT INTO routines (title, description, time) VALUES (?, ?, ?)",
      [title, description, time],
    );
    console.log("Routine added");
    onSuccess?.();
  } catch (error) {
    console.log("Insert error:", error);
  }
};

export const getRoutines = (setData: (data: Routine[]) => void) => {
  try {
    const rows = db.getAllSync<Routine>("SELECT * FROM routines");
    setData(rows);
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
) => {
  try {
    db.runSync(
      `UPDATE routines
       SET title = ?, description = ?, time = ?
       WHERE id = ?`,
      [title, description, time, id],
    );
    console.log("[RoutineX] Updated");
    onSuccess?.();
  } catch (error) {
    console.log("Update error:", error);
  }
};

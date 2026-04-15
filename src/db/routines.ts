import { Routine } from "../models/Routine";
import { db } from "./database";
export const addRoutine = (
  title: string,
  description: string,
  time: string,
  onSuccess?: () => void,
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO routines (title, description, time) VALUES (?, ?, ?)",
      [title, description, time],
      () => {
        console.log("Routine added");
        onSuccess?.();
      },
      (_: any, error: Error) => {
        console.log("Insert error:", error);
        return true;
      },
    );
  });
};

export const getRoutines = (setData: (data: Routine[]) => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "SELECT * FROM routines",
      [],
      (_: any, result: { rows: { _array: Routine[] } }) => {
        setData(result.rows._array);
      },
      (_: any, error: Error) => {
        console.log("Fetch error:", error);
        return true;
      },
    );
  });
};

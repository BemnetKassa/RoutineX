import { db } from "./database";

export const addRoutine = (
  title: string,
  description: string,
  time: string,
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO routines (title, description, time) VALUES (?, ?, ?)",
      [title, description, time],
    );
  });
};

export const getRoutines = (setData: any) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM routines", [], (_, result) => {
      setData(result.rows._array);
    });
  });
};

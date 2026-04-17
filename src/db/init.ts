import { db } from "./database";

export const initDB = () => {
  db.execSync(`CREATE TABLE IF NOT EXISTS routines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    time TEXT,
    routineType TEXT DEFAULT 'general',
    detailsJson TEXT
  );`);

  const columns = db.getAllSync<{ name: string }>(
    "PRAGMA table_info(routines)",
  );
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has("routineType")) {
    db.execSync(
      "ALTER TABLE routines ADD COLUMN routineType TEXT DEFAULT 'general'",
    );
  }

  if (!columnNames.has("detailsJson")) {
    db.execSync("ALTER TABLE routines ADD COLUMN detailsJson TEXT");
  }

  db.execSync(
    "UPDATE routines SET routineType = COALESCE(routineType, 'general')",
  );
};

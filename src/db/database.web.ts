type RoutineRow = {
  id: number;
  title: string;
  description: string;
  time: string;
};

let routines: RoutineRow[] = [];
let nextId = 1;

export const db = {
  execSync: (_source: string) => {
    // Web fallback: table creation is a no-op for in-memory storage.
  },
  runSync: (source: string, params: [string, string, string]) => {
    if (source.includes("INSERT INTO routines")) {
      const [title, description, time] = params;
      routines.push({ id: nextId++, title, description, time });
    }
    return { changes: 1, lastInsertRowId: nextId - 1 };
  },
  getAllSync: <T>(source: string): T[] => {
    if (source.includes("SELECT * FROM routines")) {
      return [...routines] as T[];
    }
    return [];
  },
};

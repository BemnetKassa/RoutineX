import { useEffect } from "react";
import Navigation from "./src/navigation";
import { initDB } from "./src/db/init";

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return <Navigation />;
}
import { useEffect } from "react";
import Navigation from "./src/navigation";
import { initDB } from "./src/db/init";
import { ensureNotificationPermissions } from "./src/services/notifications";

export default function App() {
  useEffect(() => {
    initDB();
    ensureNotificationPermissions();
  }, []);

  return <Navigation />;
}
import { createDBConnection } from "../lib/db";
import { AttendanceModuleImpl } from "./attendance";

export function app() {
    const db = createDBConnection();
    return {
        attendance: new AttendanceModuleImpl(db),
    }
}
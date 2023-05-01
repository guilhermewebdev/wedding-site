import { createDBConnection } from "../lib/db";
import { AttendanceModule, AttendanceModuleImpl } from "./attendance";

export function attendance(): AttendanceModule {
    const db = createDBConnection();
    return new AttendanceModuleImpl(db);
}
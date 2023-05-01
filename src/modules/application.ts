import { createDBConnection } from "../lib/db";
import { AdminModule, AdminModuleImpl } from "./admin";
import { AttendanceModule, AttendanceModuleImpl } from "./attendance";

export function attendance(): AttendanceModule {
    const db = createDBConnection();
    return new AttendanceModuleImpl(db);
}

export function admin(): AdminModule {
    const db = createDBConnection();
    return new AdminModuleImpl(db);
}
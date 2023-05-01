import { Db } from "mongodb";
import AttendanceControllerImpl, { AttendanceController } from "./adapters/controller";
import AttendanceRepositoryImpl, { AttendanceRepository } from "./adapters/repository";
import AttendanceServiceImpl, { AttendanceService } from "./service";

export interface AttendanceModule {
    readonly controller: AttendanceController;
}

export class AttendanceModuleImpl implements AttendanceModule {
    public readonly controller: AttendanceController;
    private repository: AttendanceRepository;
    private service: AttendanceService;

    constructor(db: Db) {
        this.repository = new AttendanceRepositoryImpl(db);
        this.service = new AttendanceServiceImpl(this.repository);
        this.controller = new AttendanceControllerImpl(this.service);
    }
}
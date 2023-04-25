import { Db } from "mongodb";
import { AdminController, AdminControllerImpl } from "./adapters/controller";
import { AdminRepository, AdminRepositoryImpl } from "./adapters/repository";
import { AdminService, AdminServiceImpl } from "./service";

export interface AdminModule {
    readonly controller: AdminController;
}

export class AdminModuleImpl implements AdminModule {
    readonly controller: AdminController;
    private readonly service: AdminService;
    private readonly repository: AdminRepository;

    constructor(db: Db) {
        this.repository = new AdminRepositoryImpl(db)
        this.service = new AdminServiceImpl(this.repository)
        this.controller = new AdminControllerImpl(this.service);
    }
}
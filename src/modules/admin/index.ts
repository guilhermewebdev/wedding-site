import { AdminController, AdminControllerImpl } from "./adapters/controller";

export interface AdminModule {
    readonly controller: AdminController;
}

export class AdminModuleImpl implements AdminModule {
    readonly controller: AdminController;

    constructor() {
        this.controller = new AdminControllerImpl();
    }
}
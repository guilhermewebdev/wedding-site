import { CreateAdminDTO, createAdminDTO } from "../DTOs/createAdmin";
import { AdminPresenter } from "../presenters";
import { AdminService } from "../service";

export interface AdminController {
    createAdmin(payload: CreateAdminDTO): Promise<AdminPresenter>;
}

export class AdminControllerImpl implements AdminController {
    private readonly service: AdminService;

    constructor(service: AdminService) {
        this.service = service;
    }

    public async createAdmin(payload: CreateAdminDTO): Promise<AdminPresenter> {
        const validated = await createAdminDTO.validate(payload);
        const clean = createAdminDTO.cast(validated, { stripUnknown: true });
        const { password, sessions, ...created } = await this.service.createAdmin(clean);
        return created;
    }
}
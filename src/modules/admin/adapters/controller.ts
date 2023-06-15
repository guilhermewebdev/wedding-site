import { UnauthorizedError } from "../../../lib/exceptions";
import { CreateAdminDTO, createAdminDTO } from "../DTOs/createAdmin";
import { CreateSessionDTO, createSessionDTO } from "../DTOs/createSession";
import { getAdminBySessionDTO } from "../DTOs/getAdminBySession";
import { AdminPresenter, SessionPresenter } from "../presenters";
import { AdminService } from "../service";

export interface AdminController {
    createAdmin(payload: CreateAdminDTO): Promise<AdminPresenter>;
    createSession(payload: CreateSessionDTO): Promise<SessionPresenter>;
    getAdminBySession(token?: string): Promise<AdminPresenter>;
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

    public async createSession(payload: CreateSessionDTO): Promise<SessionPresenter> {
        const validated = await createSessionDTO.validate(payload);
        const clean = createSessionDTO.cast(validated, { stripUnknown: true });
        const session = await this.service.createSession(clean);
        return session;
    }

    public async getAdminBySession(token?: string): Promise<AdminPresenter> {
        const validated = await getAdminBySessionDTO.validate(token);
        const clean = getAdminBySessionDTO.cast(validated);
        if(!clean) throw new UnauthorizedError('Token inválido');
        const { sessions, password, ...admin } = await this.service.getAdminBySession(clean);
        return admin;
    }
}
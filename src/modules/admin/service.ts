import { v4 } from "uuid";
import { AdminRepository } from "./adapters/repository";
import { Admin } from "./entities";
import { UserError } from "../../lib/exceptions";

export interface CreateAdminPayload extends Omit<Admin, 'id' | 'sessions'> {}

export interface AdminService {
    createAdmin(payload: CreateAdminPayload): Promise<Admin>
}

export class AdminServiceImpl implements AdminService {
    private repository: AdminRepository;

    constructor(repository: AdminRepository) {
        this.repository = repository;
    }

    private async genAdminId() {
        while (true) {
            const id = v4();
            const idExists = await this.repository.getAdmin({ id });
            if (!idExists) return id;
        }
    }

    public async createAdmin(payload: CreateAdminPayload): Promise<Admin> {
        const emailExists = await this.repository.getAdmin({ email: payload.email });
        if (emailExists) {
            throw new UserError('Email já está em uso');
        }
        const admin: Admin = {
            ...payload,
            sessions: [],
            id: await this.genAdminId(),
        }
        return this.repository.createAdmin(admin);
    }
}
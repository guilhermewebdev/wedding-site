import { v4 } from "uuid";
import { AdminRepository } from "./adapters/repository";
import { Admin } from "./entities";
import { UserError } from "../../lib/exceptions";

export interface CreateAdminPayload extends Omit<Admin, 'id' | 'sessions'> {}

export interface PasswordHash {
    encrypt(value: string): Promise<string>;
    check(value: string, hash: string): Promise<boolean>;
}

export interface AdminService {
    createAdmin(payload: CreateAdminPayload): Promise<Admin>
}

export class AdminServiceImpl implements AdminService {
    private repository: AdminRepository;
    private hash: PasswordHash;

    constructor(repository: AdminRepository, hash: PasswordHash) {
        this.repository = repository;
        this.hash = hash;
    }

    private async genAdminId() {
        while (true) {
            const id = v4();
            const idExists = await this.repository.getAdmin({ id });
            if (!idExists) return id;
        }
    }

    private async encryptPassword(password: string) {
        return this.hash.encrypt(password);
    }

    public async createAdmin(payload: CreateAdminPayload): Promise<Admin> {
        const { email, password } = payload;
        const emailExists = await this.repository.getAdmin({ email });
        if (emailExists) {
            throw new UserError('Email já está em uso');
        }
        const admin: Admin = {
            ...payload,
            password: await this.encryptPassword(password),
            sessions: [],
            id: await this.genAdminId(),
        }
        return this.repository.createAdmin(admin);
    }
}
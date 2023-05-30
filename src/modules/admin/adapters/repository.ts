import { Db } from "mongodb";
import { Admin, Session } from "../entities";
import { InternalError, UserError } from "../../../lib/exceptions";

export interface AdminFilter extends Partial<Omit<Admin, 'sessions'>> {
    sessions?: Partial<Session>;
}

export interface AdminRepository {
    createAdmin(admin: Admin): Promise<Admin>;
    getAdmin(filter: AdminFilter): Promise<Admin | null>;
    createSession(email: string, session: Session): Promise<Session>;
    getAdminBySession(token: string): Promise<Admin | null>;
}

export class AdminRepositoryImpl implements AdminRepository {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    private get admins() {
        return this.db.collection<Admin>('admin');
    }

    public async createAdmin(admin: Admin): Promise<Admin> {
        const { insertedId } = await this.admins.insertOne(admin);
        const recovered = await this.admins.findOne({ _id: insertedId });
        if (!recovered) {
            throw new InternalError('Falha ao criar administrador');
        }
        const { _id, ...adminData } = recovered;
        return adminData;
    }

    public async getAdmin(filter: AdminFilter): Promise<Admin | null> {
        return this.admins.findOne(filter);
    }

    public async createSession(email: string, session: Session) {
        const user = await this.admins.findOne({ email });
        if (!user) {
            throw new UserError('Email inválido');
        }
        await this.admins.updateOne(user, { $push: { 'sessions': session } })
        return session;
    }

    public async getAdminBySession(token: string): Promise<Admin | null> {
        const user = await this.admins.findOne({ 'sessions.token': token });
        return user;
    }
}
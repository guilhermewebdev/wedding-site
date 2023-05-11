import { Db } from "mongodb";
import { Admin, Session } from "../entities";
import { InternalError, UserError } from "../../../lib/exceptions";

export interface AdminRepository {
    createAdmin(admin: Admin): Promise<Admin>;
    getAdmin(filter: Partial<Admin>): Promise<Admin | null>;
    createSession(email: string, session: Session): Promise<Session>
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

    public async getAdmin(filter: Partial<Admin>): Promise<Admin | null> {
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
}
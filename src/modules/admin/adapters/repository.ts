import { Db } from "mongodb";
import { Admin } from "../entities";
import { InternalError } from "../../../lib/exceptions";

export interface AdminRepository {
    createAdmin(admin: Admin): Promise<Admin>;
    getAdmin(filter: Partial<Admin>): Promise<Admin | null>;
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
        return recovered;
    }

    public async getAdmin(filter: Partial<Admin>): Promise<Admin | null> {
        return this.admins.findOne(filter);
    }
}
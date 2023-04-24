import { InternalError } from "../../../lib/exceptions";
import { Code, Guest } from "../entities";
import { Db } from "mongodb";

export interface AttendanceRepository {
    createGuest(payload: Guest): Promise<Guest>;
    getCode(filter: Partial<Code>): Promise<Code | null>;
    getGuest(filter: Partial<Guest>): Promise<Guest | null>;
}

export default class AttendanceRepositoryImpl implements AttendanceRepository {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    get guests() {
        return this.db.collection<Guest>('guests');
    }

    get codes() {
        return this.db.collection<Code>('codes');
    }

    public async createGuest(payload: Guest) {
        const { insertedId } = await this.guests.insertOne(payload);
        const recovered = await this.guests.findOne<Guest>({ _id: insertedId });
        if(!recovered) {
            throw new InternalError('Falha ao salvar confirmação');
        }
        return recovered;
    }

    public async getCode(filter: Partial<Code>): Promise<Code | null> {
        return this.codes.findOne(filter);
    }

    public async getGuest(filter: Partial<Guest>): Promise<Guest | null> {
        return this.guests.findOne(filter);
    }
}
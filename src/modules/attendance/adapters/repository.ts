import { ConfirmAttendanceDTO } from "../DTOs/createGuest";
import { Guest } from "../entities";
import { Db } from "mongodb";

export interface AttendanceRepository {
    create(payload: ConfirmAttendanceDTO): Promise<Guest>;
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
        return this.db.collection('codes');
    }

    public async create(payload: Guest) {
        const { insertedId } = await this.guests.insertOne(payload);
        const recovered = await this.guests.findOne<Guest>({ _id: insertedId });
        if(!recovered) {
            throw new Error('Falha ao salvar confirmação');
        }
        return recovered;
    }
}
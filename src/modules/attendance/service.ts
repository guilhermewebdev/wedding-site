import { v4 } from "uuid";
import { AttendanceRepository } from "./adapters/repository";
import { Code, Guest } from "./entities";
import { UserError } from "../../lib/exceptions";

export interface AttendanceConfirmationPayload extends Omit<Guest, 'id'> {}

export interface AttendanceService {
    create(payload: AttendanceConfirmationPayload): Promise<Guest>;
    generateCodes(amount: number): Promise<Code[]>;
    listCodes(): Promise<Code[]>;
}

export default class AttendanceServiceImpl implements AttendanceService {
    private repository: AttendanceRepository;

    constructor(repository: AttendanceRepository) {
        this.repository = repository;
    }

    public async create(payload: AttendanceConfirmationPayload) {
        const { ...data } = payload;
        return this.repository.createGuest({
            ...data,
            id: v4(),
        });
    }

    private async generateRawCode() {
        const existingCodes = await this.repository.getAllCodes();
        const existingRawCodes = await Promise.all(existingCodes.map(async code => code.code))
        while(true) {
            const rawCode = v4();
            const existentCode = existingRawCodes.indexOf(rawCode);
            if(existentCode < 0) {
                return rawCode;
            }
        }
    }

    public async generateCodes(amount: number) {
        const rawCodes: Set<string> = new Set();
        while(rawCodes.size < amount) {
            const rawCode = await this.generateRawCode();
            rawCodes.add(rawCode);
        }
        const rawCodesArray = Array.from(rawCodes);
        const codesPromise = rawCodesArray.map(async (rawCode): Promise<Code> => ({
            code: rawCode,
            id: rawCode,
        }));
        const codes = await Promise.all(codesPromise);
        return this.repository.bulkCreateCodes(codes);
    }

    public async listCodes() {
        return this.repository.getAllCodes()
    }
}
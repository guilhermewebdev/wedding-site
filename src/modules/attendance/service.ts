import { v4 } from "uuid";
import { AttendanceRepository } from "./adapters/repository";
import { Guest } from "./entities";

export interface AttendanceConfirmationPayload extends Omit<Guest, 'id'> {}

export interface AttendanceService {
    create(payload: AttendanceConfirmationPayload): Promise<Guest>;
}

export default class AttendanceServiceImpl implements AttendanceService {
    private repository: AttendanceRepository;

    constructor(repository: AttendanceRepository) {
        this.repository = repository;
    }

    public async create(payload: AttendanceConfirmationPayload) {
        if (!payload.email && !payload.phone) {
            throw new Error('Informe o telefone ou o email');
        }
        return this.repository.create({
            ...payload,
            id: v4(),
        });
    }
}
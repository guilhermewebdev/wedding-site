import { v4 } from "uuid";
import { AttendanceRepository } from "./adapters/repository";
import { Guest } from "./entities";
import { UserError } from "../../lib/exceptions";

export interface AttendanceConfirmationPayload extends Omit<Guest, 'id' | 'codeId'> {
    code: string;
}

export interface AttendanceService {
    create(payload: AttendanceConfirmationPayload): Promise<Guest>;
}

export default class AttendanceServiceImpl implements AttendanceService {
    private repository: AttendanceRepository;

    constructor(repository: AttendanceRepository) {
        this.repository = repository;
    }

    public async create(payload: AttendanceConfirmationPayload) {
        const { code: plainCode, ...data } = payload;
        if (!payload.email && !payload.phone) {
            throw new UserError('Informe o telefone ou o email');
        }
        const code = await this.repository.getCode({ id: plainCode });
        if(!code) {
            throw new UserError('Código inválido');
        }
        const guest = await this.repository.getGuest({ codeId: code.id });
        if (!!guest) {
            throw new UserError('Código já está sendo utilizado');
        }
        return this.repository.createGuest({
            ...data,
            id: v4(),
            codeId: code.id,
        });
    }
}
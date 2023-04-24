import { ConfirmAttendanceDTO } from "./DTOs/createGuest";
import { AttendanceRepository } from "./adapters/repository";
import { Guest } from "./entities";
import AttendanceServiceImpl, { AttendanceService } from "./service";
import { v4 } from "uuid";

class AttendantRepositoryMock implements AttendanceRepository {
    async create(payload: ConfirmAttendanceDTO): Promise<Guest> {
        return {
            ...payload,
            id: v4(),
        };
    }
}

describe('AttendantService', () => {
    let service: AttendanceService;
    beforeEach(() => {
        service = new AttendanceServiceImpl(new AttendantRepositoryMock());
    })
    it('.create', async () => {
        const created = await service.create({
            codeId: v4(),
            name: 'Test Guest',
            email: 'test@test.com',
        });
        expect(typeof created.id).toEqual('string');
        expect(created.email).toEqual('test@test.com');
    })
});
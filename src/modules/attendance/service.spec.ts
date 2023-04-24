import { AttendanceRepository } from "./adapters/repository";
import { Code, Guest } from "./entities";
import AttendanceServiceImpl, { AttendanceService } from "./service";
import { v4 } from "uuid";

const createGuest = jest.fn(async (payload) => ({
    ...payload,
    id: v4(),
}))

const getCode = jest.fn(async (filter) => ({
    id: v4(),
    code: v4(),
    ...filter,
}))

const getGuest = jest.fn(async (filter) => ({
    codeId: v4(),
    name: 'Test Guest',
    email: 'test@test.com',
    id: v4(),
    ...filter,
}))

const getGuest_returnNull = jest.fn(async () => null)

describe('AttendantService', () => {
    let service: AttendanceService;
    const repository: AttendanceRepository = {
        createGuest,
        getCode,
        getGuest,
    }
    beforeEach(() => {
        service = new AttendanceServiceImpl(repository);
    })
    it('.create', async () => {
        service = new AttendanceServiceImpl({
            ...repository,
            getGuest: getGuest_returnNull,
        })
        const created = await service.create({
            code: v4(),
            name: 'Test Guest',
            email: 'test@test.com',
        });
        expect(typeof created.id).toEqual('string');
        expect(created.email).toEqual('test@test.com');
    })
});
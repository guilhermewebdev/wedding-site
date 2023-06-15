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
}));

const bulkCreateCodes = jest.fn(async (codes) => codes)

const returnNull = jest.fn(async (): Promise<null> => new Promise((accept) => {
    setTimeout(() => accept(null), 50);
}))

const getAllCodes = jest.fn(async () => Array.from({ length: 30 }).fill(null).map(() => ({
    code: v4(),
    id: v4(),
})))

describe('AttendantService', () => {
    let service: AttendanceService;
    const repository: AttendanceRepository = {
        createGuest,
        getCode,
        getGuest,
        bulkCreateCodes,
        getAllCodes,
    }
    beforeEach(() => {
        service = new AttendanceServiceImpl(repository);
    })
    it('.create', async () => {
        service = new AttendanceServiceImpl({
            ...repository,
            getGuest: returnNull,
        })
        const created = await service.create({
            code: v4(),
            name: 'Test Guest',
            email: 'test@test.com',
        });
        expect(typeof created.id).toEqual('string');
        expect(created.email).toEqual('test@test.com');
    });
    it('.generateCodes', async () => {
        service = new AttendanceServiceImpl({
            ...repository,
            getCode: returnNull,
        })
        const codes = await service.generateCodes(100);
        expect(codes.length).toEqual(100);
    });
    it('.getAllCodes', async () => {
        const codes = await service.listCodes();
        expect(codes.length).toEqual(30);
    });
});
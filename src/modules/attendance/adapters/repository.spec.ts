import { Db } from "mongodb";
import AttendanceRepositoryImpl, { AttendanceRepository } from "./repository";
import { v4 } from 'uuid';

const mockDB = ({
    collection: jest.fn(() => ({
        insertOne: jest.fn(() => ({
            insertedId: 1
        })),
        findOne: jest.fn(() => ({
            _id: 1,
            id: v4(),
        })),
    })),
} as unknown) as Db;

describe('AttendanceRepository', () => {
    let repository: AttendanceRepository;
    beforeEach(() => {
        repository = new AttendanceRepositoryImpl(mockDB);
    })
    it('.createGuest', async () => {
        const created = await repository.createGuest({
            codeId: v4(),
            name: 'Test Guest',
            email: 'test@test.com',
            id: v4(),
        });
        expect(typeof created.id).toEqual('string');
    });
    it('.getCode', async () => {
        const code = await repository.getCode({ code: 'test' });
        expect(typeof code).toEqual('object');
    })
})
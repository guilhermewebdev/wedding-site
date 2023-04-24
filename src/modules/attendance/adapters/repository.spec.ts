import { Db } from "mongodb";
import AttendanceRepositoryImpl, { AttendanceRepository } from "./repository";
import { v4 } from 'uuid';

const mockDB = ({
    collection: jest.fn(() => ({
        insertOne: jest.fn(() => ({
            insertedId: 1
        })),
        findOne: jest.fn(() => ({
            id: v4(),
        })),
    })),
} as unknown) as Db;

describe('AttendanceRepository', () => {
    let repository: AttendanceRepository;
    beforeEach(() => {
        repository = new AttendanceRepositoryImpl(mockDB);
    })
    it('.create', async () => {
        const created = await repository.create({
            codeId: v4(),
            name: 'Test Guest',
            email: 'test@test.com',
            id: v4(),
        });
        expect(typeof created.id).toEqual('string');
    });
})
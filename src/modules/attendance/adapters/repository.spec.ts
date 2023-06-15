import { Db } from "mongodb";
import AttendanceRepositoryImpl, { AttendanceRepository } from "./repository";
import { v4 } from 'uuid';

const collectionActions = {
    insertOne: jest.fn(() => ({
        insertedId: 1
    })),
    findOne: jest.fn(() => ({
        _id: 1,
        id: v4(),
    })),
    insertMany: jest.fn(),
    find: jest.fn((filter = {}) => ({
        toArray: jest.fn(() => Array.from({ length: 100 })
            .fill(null)
            .map(() => ({ code: v4(), id: v4(), ...filter }))
        )
    }))
}

const mockDB = ({
    collection: jest.fn(() => collectionActions),
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
    });
    it('.bulkCreateCodes', async () => {
        const fakeCodes = Array.from({ length: 100 })
            .fill(null)
            .map(() => ({ code: v4(), id: v4() }));
        const created = await repository.bulkCreateCodes(fakeCodes);
        expect(created.length).toEqual(100);
        expect(collectionActions.insertMany).toBeCalledTimes(1);
    });
    it('.getAllCodes', async () => {
        const codes = await repository.getAllCodes();
        expect(codes instanceof Array).toBeTruthy();
        expect(codes.length).toBeGreaterThan(0);
    })
})
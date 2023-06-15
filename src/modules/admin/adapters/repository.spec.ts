import { v4 } from "uuid";
import { AdminRepository, AdminRepositoryImpl } from "./repository"
import { Db } from "mongodb";

const mockDB = ({
    collection: jest.fn(() => ({
        insertOne: jest.fn(() => ({
            insertedId: 1
        })),
        findOne: jest.fn((filter) => ({
            _id: 1,
            id: v4(),
            ...filter,
        })),
        updateOne: jest.fn((filter, data) => ({
            ...filter,
            ...data,
        }))
    })),
} as unknown) as Db;

describe('AdminRepository', () => {
    let repository: AdminRepository;
    beforeEach(() => {
        repository = new AdminRepositoryImpl(mockDB);
    });
    it('.createAdmin', async () => {
        const created = await repository.createAdmin({
            email: 'test@test.com',
            name: "Test name",
            password: 'test_password',
            id: v4(),
            sessions: [],
        });
        expect(typeof created.id).toEqual('string');
    });
    it('.getAdmin', async () => {
        const id = v4();
        const admin = await repository.getAdmin({ id });
        expect(admin?.id).toEqual(id);
    });
    it('.createSession', async () => {
        const created = await repository.createSession('test@test.com', {
            dateTime: new Date(),
            token: v4(),
        });
        expect(typeof created.token).toEqual('string');
    });
    it('.getAdminBySession', async () => {
        const user = await repository.getAdminBySession('t0k3n');
        expect(user).not.toBeNull();
        expect(user).toBeDefined();
    })
})
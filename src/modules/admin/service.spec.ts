import { v4 } from "uuid";
import { AdminRepository } from "./adapters/repository";
import { AdminService, AdminServiceImpl } from "./service"
import { PasswordHashImpl } from "../../lib/hash";
import { UnauthorizedError } from "../../lib/exceptions";

const hash = new PasswordHashImpl();

const createAdmin = jest.fn(async (data) => ({
    ...data,
    id: v4(),
    sessions: [],
    password: await hash.encrypt(data.password),
}));
const getAdmin = jest.fn(async () => ({
    email: 'test@test.com',
    name: "Test name",
    password: await hash.encrypt('test_password'),
    sessions: [],
    id: v4(),
    _id: 1,
}));
const getAdminAndReturnNull = jest.fn(async () => null)
const createSession = jest.fn(async (_email, data) => data);

describe('AdminService', () => {
    let service: AdminService;
    const repository: AdminRepository = {
        createAdmin,
        getAdmin,
        createSession,
        getAdminBySession: getAdmin
    }
    beforeEach(() => {
        service = new AdminServiceImpl(repository, hash);
    });
    it('.createAdmin', async () => {
        service = new AdminServiceImpl({
             ...repository, getAdmin: getAdminAndReturnNull 
        }, hash);
        const created = await service.createAdmin({
            email: 'test@test.com',
            name: "Test name",
            password: 'test_password',
        });
        expect(typeof created.id).toEqual('string');
        expect(created.password).not.toEqual('test_password')
    }, 20 * 1000);
    it('.createSession', async () => {
        const created = await service.createSession({
            email: 'test@test.com',
            password: 'test_password',
            browser: 'test',
        });
        expect(typeof created.token).toEqual('string');
    }, 20 * 1000);
    describe('.getAdminBySession', () => {
        it('with success', async () => {
            const admin = await service.getAdminBySession('');
            expect(admin).not.toBeNull();
        });
        it('with error', async () => {
            service = new AdminServiceImpl({
                ...repository, getAdminBySession: getAdminAndReturnNull 
           }, hash);
           await expect(service.getAdminBySession('')).rejects.toEqual(new UnauthorizedError('Não autorizado'))
        })
    });
})
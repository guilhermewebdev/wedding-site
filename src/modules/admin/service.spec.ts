import { v4 } from "uuid";
import { AdminRepository } from "./adapters/repository";
import { AdminService, AdminServiceImpl } from "./service"
import { PasswordHashImpl } from "../../lib/hash";

const createAdmin = jest.fn(async (data) => ({
    ...data,
    id: v4(),
    sessions: [],
}))
const getAdmin = jest.fn()

describe('AdminService', () => {
    let service: AdminService;
    const hash = new PasswordHashImpl();
    const repository: AdminRepository = {
        createAdmin,
        getAdmin,
    }
    beforeEach(() => {
        service = new AdminServiceImpl(repository, hash);
    });
    it('.createAdmin', async () => {
        const created = await service.createAdmin({
            email: 'test@test.com',
            name: "Test name",
            password: 'test_password',
        });
        expect(typeof created.id).toEqual('string');
        expect(created.password).not.toEqual('test_password')
    }, 20 * 1000)
})
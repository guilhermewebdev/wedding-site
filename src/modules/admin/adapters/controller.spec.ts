import { v4 } from "uuid";
import { AdminService } from "../service";
import { AdminController, AdminControllerImpl } from "./controller"
import { Admin } from "../entities";

const createAdmin = jest.fn(async (payload) => ({
    id: v4(),
    sessions: [],
    ...payload,
}));
const createSession = jest.fn(async (_) => ({
    token: v4(),
    dateTime: new Date(),
}))
const getAdminBySession = jest.fn(async (_: string): Promise<Admin> => ({
    id: v4(),
}) as unknown as Admin)

describe('AdminController', () => {
    let controller: AdminController;
    const service: AdminService = {
        createAdmin,
        createSession,
        getAdminBySession,
    }
    beforeEach(() => {
        controller = new AdminControllerImpl(service);
    })
    it('.createAdmin', async () => {
        const created = await controller.createAdmin({
            email: 'test@test.com',
            name: "Test name",
            password: 'test_password',
        });
        expect(created).not.toContain('password')
        expect(createAdmin).toBeCalled();
    });
    it('.createSession', async () => {
        const created = await controller.createSession({
            email: 'test@test.com',
            password: 'test_password',
        });
        expect(typeof created.token).toEqual('string');
    });
    describe('.getAdminBySession', () => {
        it('with success', async () => {
            const admin = await controller.getAdminBySession('t0k3n');
            expect(admin).not.toBeNull();
        });
    })
})
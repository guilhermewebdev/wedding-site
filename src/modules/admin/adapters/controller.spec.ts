import { v4 } from "uuid";
import { AdminService } from "../service";
import { AdminController, AdminControllerImpl } from "./controller"

const createAdmin = jest.fn(async (payload) => ({
    id: v4(),
    sessions: [],
    ...payload,
}));
const createSession = jest.fn(async (_) => ({
    token: v4(),
    dateTime: new Date(),
}))

describe('AdminController', () => {
    let controller: AdminController;
    const service: AdminService = {
        createAdmin,
        createSession,
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
    })
})
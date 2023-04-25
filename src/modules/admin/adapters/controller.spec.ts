import { v4 } from "uuid";
import { AdminService } from "../service";
import { AdminController, AdminControllerImpl } from "./controller"

const createAdmin = jest.fn((payload) => ({
    id: v4(),
    sessions: [],
    ...payload,
}))

describe('AdminController', () => {
    let controller: AdminController;
    const service: AdminService = {
        createAdmin,
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
    })
})
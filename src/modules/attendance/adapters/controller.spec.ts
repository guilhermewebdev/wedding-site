import { v4 } from "uuid";
import { Guest } from "../entities";
import { AttendanceConfirmationPayload, AttendanceService } from "../service";
import AttendanceControllerImpl, { AttendanceController } from "./controller";

const create = jest.fn(async ({ code, ...payload }) => ({
    ...payload,
    id: v4(),
    codeId: v4(),
}))

const generateCodes = jest.fn(async () => [])

describe('AttendanceController', () => {
    let controller: AttendanceController;
    const service: AttendanceService = {
        create,
        generateCodes,
    }
    beforeEach(() => {
        controller = new AttendanceControllerImpl(service);
    });
    it('.create', async () => {
        const created = await controller.create({
            code: v4(),
            name: 'Test Guest',
            email: 'test@test.com'
        })
        expect(typeof created.id).toEqual('string');
        expect(create).toBeCalled()
    })
});
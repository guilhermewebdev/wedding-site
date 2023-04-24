import { v4 } from "uuid";
import { Guest } from "../entities";
import { AttendanceConfirmationPayload, AttendanceService } from "../service";
import AttendanceControllerImpl, { AttendanceController } from "./controller";

class AttendanceServiceMock implements AttendanceService {
    async create(payload: AttendanceConfirmationPayload): Promise<Guest> {
        return {
            ...payload,
            id: v4(),
        }
    }
}

describe('AttendanceController', () => {
    let controller: AttendanceController;
    beforeEach(() => {
        controller = new AttendanceControllerImpl(new AttendanceServiceMock());
    });
    it('.create', async () => {
        const created = await controller.create({
            codeId: v4(),
            name: 'Test Guest',
            email: 'test@test.com'
        })
        expect(typeof created.id).toEqual('string');
    })
});
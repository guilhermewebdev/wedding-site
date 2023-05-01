import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../DTOs/createGuest";
import { CreatedGuestPresenter } from "../presenters";
import { AttendanceService } from "../service";

export interface AttendanceController {
    create(payload: ConfirmAttendanceDTO): Promise<CreatedGuestPresenter>
}

export default class AttendanceControllerImpl implements AttendanceController {
    private service: AttendanceService;

    constructor(service: AttendanceService) {
        this.service = service;
    }

    public async create(payload: ConfirmAttendanceDTO) {
        const validated = await confirmAttendanceDTOimpl.validate(payload);
        const created = await this.service.create(validated);
        return created;
    }
}
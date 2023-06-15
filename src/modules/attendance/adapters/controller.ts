import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../DTOs/createGuest";
import { GenerateCodesDTO, generateCodesDTO } from "../DTOs/generateCodes";
import { CodePresenter, CreatedGuestPresenter } from "../presenters";
import { AttendanceService } from "../service";

export interface AttendanceController {
    create(payload: ConfirmAttendanceDTO): Promise<CreatedGuestPresenter>;
    generateCodes(payload: GenerateCodesDTO): Promise<CodePresenter[]>;
    listCodes(): Promise<CodePresenter[]>;
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

    public async generateCodes(payload: GenerateCodesDTO) {
        const { amount } = await generateCodesDTO.validate(payload);
        const generated = await this.service.generateCodes(amount);
        return generated;
    }

    public async listCodes() {
        const codes = await this.service.listCodes();
        return codes;
    }
}
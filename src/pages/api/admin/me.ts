import { NextApiRequest, NextApiResponse } from "next";
import { AdminPresenter } from "../../../modules/admin/presenters";
import { processError } from "../../../lib/exceptions";
import { admin } from "../../../modules/application";

const { controller } = admin();
const {
    AUTH_COOKIE_NAME = '',
} = process.env;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AdminPresenter | { message: string }>
) {
    try {
        const token = req.cookies[AUTH_COOKIE_NAME];
        const admin = await controller.getAdminBySession(token);
        res.status(200).json(admin)
    } catch (error) {
        const { httpStatus, message } = await processError(error);
        res.status(httpStatus).json({ message });
    } finally {
        res.end();
    }
}
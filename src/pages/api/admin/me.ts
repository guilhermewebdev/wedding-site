import { NextApiRequest, NextApiResponse } from "next";
import { AdminPresenter } from "../../../modules/admin/presenters";
import { admin } from "../../../modules/application";
import { MethodRouterImpl } from "lib/methodRouter";

const { controller } = admin();
const {
    AUTH_COOKIE_NAME = '',
} = process.env;


const router = new MethodRouterImpl({
    'GET': async (
        req: NextApiRequest,
        res: NextApiResponse<AdminPresenter | { message: string }>
    ) => {
        const token = req.cookies[AUTH_COOKIE_NAME];
        const admin = await controller.getAdminBySession(token);
        res.status(200).json(admin)
    }
})

export default router.handler;
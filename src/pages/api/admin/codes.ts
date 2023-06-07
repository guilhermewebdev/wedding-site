import { NextApiRequest, NextApiResponse } from "next";
import { attendance } from "../../../modules/application";
import { CodePresenter } from "../../../modules/attendance/presenters";
import checkAuth from "../../../lib/checkAuth";
import { MethodRouterImpl } from "lib/methodRouter";

const { controller } = attendance();

async function generateCodes(
    req: NextApiRequest,
    res: NextApiResponse<CodePresenter[] | { message: string }>
) {
    await checkAuth(req);
    const created = await controller.generateCodes(req.body);
    res.status(201).json(created)
}

async function listCodes(
    req: NextApiRequest,
    res: NextApiResponse<CodePresenter[] | { message: string }>
) {
    await checkAuth(req);
    const codes = await controller.listCodes();
    res.status(200).json(codes);
}

const router = new MethodRouterImpl({
    'POST': generateCodes,
    'GET': listCodes,
})

export default router.handler;
import { NextApiRequest, NextApiResponse } from "next";
import { attendance } from "../../../modules/application";
import { CodePresenter } from "../../../modules/attendance/presenters";
import { MethodNotAllowedError, processError } from "../../../lib/exceptions";
import checkAuth from "../../../lib/checkAuth";

const { controller } = attendance();

async function generateCodes(
    req: NextApiRequest,
    res: NextApiResponse<CodePresenter[] | { message: string }>
) {
    const created = await controller.generateCodes(req.body);
    res.status(201).json(created)
}

async function listCodes(
    _req: NextApiRequest,
    res: NextApiResponse<CodePresenter[] | { message: string }>
) {
    const codes = await controller.listCodes();
    res.status(200).json(codes);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CodePresenter[] | { message: string }>
) {
    try {
        await checkAuth(req);
        switch(req.method) {
            case 'POST': await generateCodes(req, res);
            case 'GET': await listCodes(req, res);
            default: throw new MethodNotAllowedError('Método não permitido');
        }
    } catch (error) {
        const { httpStatus, message } = await processError(error);
        res.status(httpStatus).json({ message });
    } finally {
        res.end();
    }
}
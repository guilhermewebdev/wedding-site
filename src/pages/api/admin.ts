import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../modules/application";
import { UnauthorizedError, processError } from "../../lib/exceptions";
import { AdminPresenter } from "../../modules/admin/presenters";

const { controller } = admin();
const {
    ROOT_TOKEN = '',
} = process.env;

async function validateToken(token: string) {
    if (token !== ROOT_TOKEN) {
        throw new UnauthorizedError('Token Inválido');
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AdminPresenter | { message: string }>
) {
    try {
        if (req.method == 'post') {
            const { token, ...body } = req.body;
            await validateToken(token);
            const response = await controller.createAdmin(body);
            res.status(201).json(response);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        const { httpStatus, message } = await processError(error);
        res.status(httpStatus).json({ message });
    } finally {
        res.end();
    }
}
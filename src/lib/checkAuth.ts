import { NextApiRequest } from "next/dist/shared/lib/utils";
import { admin } from "../modules/application";
import { UnauthorizedError } from "./exceptions";

const { controller } = admin();
const {
    AUTH_COOKIE_NAME = '',
} = process.env;


export default async function checkAuth(req: NextApiRequest) {
    const token = req.cookies[AUTH_COOKIE_NAME];
    const admin = await controller.getAdminBySession(token);
    if (!admin) throw new UnauthorizedError('Faça o login para continuar');
}
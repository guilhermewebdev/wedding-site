// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SessionPresenter } from '../../modules/admin/presenters';
import { admin } from '../../modules/application';
import { MethodNotAllowedError, processError } from '../../lib/exceptions';

const { controller } = admin();
const {
    AUTH_COOKIE_NAME = '',
} = process.env;

async function createSession(
  req: NextApiRequest,
  res: NextApiResponse<SessionPresenter | { message: string }>
) {
  const response = await controller.createSession({
    ...req.body,
    browser: req.headers['user-agent'],
  });
  res.setHeader("set-cookie", `${AUTH_COOKIE_NAME}=${response.token};`)
  res.status(201).json(response);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionPresenter | { message: string }>
) {
    try {
      switch(req.method) {
        case 'POST': await createSession(req, res);
        default: throw new MethodNotAllowedError('Método não permitido');
      }
  } catch (error: any) {
        const { httpStatus, message } = await processError(error);
        res.status(httpStatus).json({ message });
  } finally {
        res.end()
  }
}

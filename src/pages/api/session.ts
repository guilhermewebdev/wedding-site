// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SessionPresenter } from '../../modules/admin/presenters';
import { admin } from '../../modules/application';
import { processError } from '../../lib/exceptions';
import { cookies } from 'next/headers';

const { controller } = admin();
const {
    AUTH_COOKIE_NAME = '',
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionPresenter | { message: string }>
) {
    try {
        const response = await controller.createSession(req.body);
        cookies().set(AUTH_COOKIE_NAME, response.token);
        res.status(201).json(response);
  } catch (error: any) {
        const { httpStatus, message } = await processError(error);
        res.status(httpStatus).json({ message });
  } finally {
        res.end()
  }
}

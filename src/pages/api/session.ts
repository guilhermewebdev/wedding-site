// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SessionPresenter } from '../../modules/admin/presenters';
import { admin } from '../../modules/application';
import { MethodRouterImpl } from 'lib/methodRouter';

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

const router = new MethodRouterImpl({
  'POST': createSession,
})

export default router.handler;

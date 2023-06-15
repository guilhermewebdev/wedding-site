// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreatedGuestPresenter } from '../../modules/attendance/presenters';
import { attendance } from '../../modules/application';
import { MethodRouterImpl } from 'lib/methodRouter';

const { controller } = attendance();

const router = new MethodRouterImpl({
  'POST': async (
    req: NextApiRequest,
    res: NextApiResponse<CreatedGuestPresenter | { message: string }>
  ) => {
    const response = await controller.create(req.body)
    res.status(201).json(response);
  }
});

export default router.handler;

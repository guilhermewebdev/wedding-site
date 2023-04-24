// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreatedGuestPresenter } from '../../modules/attendance/presenters';
import { app } from '../../modules/application';
import { processError } from '../../lib/exceptions';

const { attendance: { controller } } = app();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedGuestPresenter | { message: string }>
) {
  try {
    const response = await controller.create(req.body)
    res.status(201).json(response);
  } catch (error: any) {
    const { httpStatus, message } = await processError(error);
    res.status(httpStatus).json({ message });
  } finally {
    res.end()
  }
}

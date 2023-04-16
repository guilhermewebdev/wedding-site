// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreatedGuestPresenter } from '../../modules/attendance/presenters';
import { app } from '../../modules/application';

const { attendance: { controller } } = app();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedGuestPresenter | { message: string }>
) {
  try {
    const response = await controller.create(req.body)
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error?.message })
  } finally {
    res.end()
  }
}

import checkAuth from "lib/checkAuth";
import { MethodRouterImpl } from "lib/methodRouter";
import { NextApiRequest, NextApiResponse } from "next";
import * as QRCode from "qrcode";
import getConfig from 'next/config';
import { Writable } from "stream";
import { Readable } from "stream";

const { publicRuntimeConfig } = getConfig();
const {
    NEXT_PUBLIC_BASE_RSVP_URL = '',
} = publicRuntimeConfig;

const router = new MethodRouterImpl({
    'GET': async (req: NextApiRequest, res: NextApiResponse) => {
        return new Promise(async (resolve, reject) => {
            await checkAuth(req);
            const { code } = req.query;
            const url = `${NEXT_PUBLIC_BASE_RSVP_URL}/${code}`
            res.setHeader('Content-Type', 'image/png');
            const writer = new Writable({
                write: (chunk, encoding, next) => {
                    res.write(chunk, encoding)
                    next();
                },
            });
            writer.on('close', () => {
                res.status(200).end();
                resolve(null);
            });
            writer.on('error', reject);
            await QRCode.toFileStream(writer, url, { type: 'png', errorCorrectionLevel: 'Q' });
        })
    }
});

export default router.handler;
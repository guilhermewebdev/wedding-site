import { NextApiRequest, NextApiResponse } from "next";
import { MethodNotAllowedError, processError } from "./exceptions";

type Handler = (...args: any) => Promise<any>

export interface MethodRouter {
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}

type MethodMapping = {
    [s in string]?: Handler
}

export class MethodRouterImpl implements MethodRouter {
    private readonly mapping: MethodMapping;

    constructor(mapping: MethodMapping) {
        this.mapping = {
            OPTIONS: this.defaultOptionsHandler,
        };
        Object.assign(this.mapping, mapping);
    }

    get allowedMethods() {
        return Object.keys(this.mapping);
    }

    private readonly defaultOptionsHandler = async (
        _req: NextApiRequest,
        res: NextApiResponse
    ) => {
        res.setHeader('Access-Control-Allow-Methods', this.allowedMethods.join(', '));
    }

    private async handle(req: NextApiRequest, res: NextApiResponse) {
        const { method = '' } = req;
        const handler = this.mapping[method];
        if (!handler) {
            return async (..._: any) => {
                throw new MethodNotAllowedError('Método não permitido')
            }
        }
        return handler(req, res);
    }

    public readonly handler = async (
        req: NextApiRequest, 
        res: NextApiResponse
    ): Promise<void> => {
        try {
            await this.handle(req, res);
          } catch (error: any) {
            const { httpStatus, message } = await processError(error);
            res.status(httpStatus).json({ message });
          }
    }
    
}
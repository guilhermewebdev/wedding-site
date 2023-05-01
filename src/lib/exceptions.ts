import { logger } from "./logger";

export class UserError extends Error {}

export class InternalError extends Error {}

interface ParsedError {
    httpStatus: number;
    message: string;
}

export async function processError(error: any): Promise<ParsedError> {
    logger.error(`<${error.constructor.name}: ${error.message}>\n${error.stack}`)
    switch (error.constructor) {
        case UserError:
            return { httpStatus: 400, message: error.message }
        case InternalError:
            return { httpStatus: 500, message: error.message }
        default:
            return { httpStatus: 400, message: 'Erro desconhecido' }
      }
}
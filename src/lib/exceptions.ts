import { logger } from "./logger";

abstract class BaseError extends Error {
    abstract readonly httpStatus: number;
}

export class UserError extends BaseError {
    readonly httpStatus = 400;
}

export class UnauthorizedError extends BaseError {
    readonly httpStatus = 401;
}

export class InternalError extends BaseError {
    readonly httpStatus = 500;
}

export class MethodNotAllowedError extends BaseError {
    readonly httpStatus = 405;
}

interface ParsedError {
    httpStatus: number;
    message: string;
}

export async function processError(error: any): Promise<ParsedError> {
    logger.error(`<${error.constructor.name}: ${error.message}>\n${error.stack}`)
    if (error.httpStatus) {
        return { httpStatus: error.httpStatus, message: error.message }
    }
    return { httpStatus: 500, message: 'Erro desconhecido' }
}
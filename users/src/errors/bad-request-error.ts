import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    readonly statusCode = 400;
    constructor(private reason: string) {
        super(reason);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.reason }];
    }
}
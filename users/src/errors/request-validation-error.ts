import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    readonly statusCode = 400;
    constructor(private errors: ValidationError[]) {
        super("Invalid request parameters");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
}
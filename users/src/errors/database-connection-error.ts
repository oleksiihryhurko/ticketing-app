import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    readonly statusCode = 500;
    constructor() {
        super("Error connecting to database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Error connecting to database" }];
    }
}
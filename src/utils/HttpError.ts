export class HttpError extends Error {
    public statusCode: number;
    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }
    toJSON() {
        return {
            message: this.message ? this.message : this.constructor.name,
            statusCode: this.statusCode,
        };
    }
}
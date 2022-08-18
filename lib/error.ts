class AppError extends Error {
    public code: ErrorCode;

    constructor(message: string, code: ErrorCode){
        super(message);
        this.code = code;
    }
}

export type ErrorCode = "network_error" |
                        "server_error" |
                        "unauthorized";

export default AppError;
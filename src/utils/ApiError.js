class ApiError extends Error{
    constructor(
        statusCode,
        message = "Error at apiError constructor",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stck = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}; 

module.exports = ApiError
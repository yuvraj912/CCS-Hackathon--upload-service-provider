class ApiResponse {
    constructor(
        statusCode,
        data,
        message= "success"
    ){
        this.statusCode = statusCode,
        super(message),
        this.data = data,
        this.success = statusCode <400
    }
}

module.exports = ApiResponse;
class ApiResponse {
    constructor(
        statusCode,
        message= "Error at ApiResponse.js",
        data,
    ){
        this.statusCode = statusCode,
        super(message),
        this.data = data,
        this.success = statusCode <400
    }
}
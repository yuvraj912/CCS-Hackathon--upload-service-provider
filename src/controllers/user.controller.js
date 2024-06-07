const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../models/user.model.js")
const ApiError = require("../utils/ApiError.js")


const registerUser = asyncHandler( async(req, res) =>{
    const{username, fullName, email, password} = req.body;
    console.log("email:", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() ==="")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
})


module.exports = registerUser
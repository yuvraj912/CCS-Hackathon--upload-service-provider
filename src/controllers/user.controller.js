const asyncHandler = require("../utils/asyncHandler.js");

const registerUser = asyncHandler( async(req, res) =>{
    const{username, fullName, email, password} = req.body;
    console.log("email:", email);
})

module.exports = registerUser
const Router = require("express");
const registerUser = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");
const ApiError = require("../utils/ApiError.js");

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
        registerUser
);

if (
    [fullName, email, username, password].some((field) => field?.trim() ==="")
) {
    throw new ApiError(400, "All fields are required")
}

module.exports = router
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    avatar:{
        type: String,   //cloudinary url
        required: true,
    },
    coverImage:{
        type: String,   //will be saving to cloudinary url    
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken:{
        type: String,
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next() ;
    // options.validateModifiedOnly;

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
        _id : this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
    )
}


const User = mongoose.model('User', userSchema);
module.exports = User;
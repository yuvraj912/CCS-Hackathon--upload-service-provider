require('dotenv').config({path:'./env'});

const mongoose = require("mongoose");
const { DB_NAME } = require("./constants.js");
const connectDB = require("./db/index.js");
const app = require("./app.js");

console.log('MONGODB_URI:', process.env.MONGODB_URI);

connectDB();

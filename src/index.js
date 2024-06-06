require('dotenv').config({ path: './env'});

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB_NAME = require("./constants.js");
const connectDB = require("../src/db/index.js");


connectDB();
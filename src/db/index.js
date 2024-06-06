const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js");

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB connected successfully ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error ", error)
        process.exit(1);
    }
}


console.log(`Database Name: ${DB_NAME}`);

module.exports = connectDB;
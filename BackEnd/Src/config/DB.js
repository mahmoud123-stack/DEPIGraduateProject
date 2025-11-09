//  Importing mongoose
const MongoDB = require("mongoose");

//  Connecting to MongoDB
const connectDB = async () => {
  try {
    //  Connecting to MongoDB
    await MongoDB.connect(process.env.DB_URL);
    console.log("✅ MongoDB Connected");
  } catch (Error) {
    console.log(Error);
  }
};
//  Exporting the connection function
module.exports = connectDB;

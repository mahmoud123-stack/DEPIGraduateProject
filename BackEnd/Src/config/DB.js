//  Importing mongoose
const MongoDB = require("mongoose");

//  Connecting to MongoDB
const connectDB = async () => {
  try {
    // mongoose.set("debug", true);
    //  Connecting to MongoDB
    await MongoDB.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log("✅ MongoDB Connected");
  } catch (Error) {
    console.log(Error);
  }
};
//  Exporting the connection function
module.exports = connectDB;

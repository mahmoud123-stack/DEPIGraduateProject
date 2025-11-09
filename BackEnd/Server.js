const dotenv = require("dotenv");
const ConnectDB = require("./Src/config/DB");
const app = require("./Src/App");

//  Using dotenv to get the environment variables
dotenv.config();
//  Connecting to MongoDB
ConnectDB();

//  Listening to the port
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

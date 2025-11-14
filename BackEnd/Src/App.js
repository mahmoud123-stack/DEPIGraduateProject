const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./Routes/auth.routes");
const chatRoute = require("./Routes/chatRoutes");
// const DashBoardRoute = require("./Routes/DashBoard.routes");
//  Creating a new express app
const app = express();

//  Using cors to allow requests from all origins
//  Using express.json() to parse the body of the request
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", AuthRoute);
// app.use("/api/generate", chatRoute);
// app.use("/api/DashBoard/", DashBoardRoute);

//  Exporting the app
module.exports = app;

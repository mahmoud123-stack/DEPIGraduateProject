const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./Routes/auth.routes");
// const chatRoute = require("./Routes/chatRoutes");
const TrackRoute = require("./Routes/Track.routes");
// const BlogRoute = require("./Routes/Article.routes");
// const DashBoardRoute = require("./Routes/DashBoard.routes");
//  Creating a new express app
const app = express();

//  Using cors to allow requests from all origins
//  Using express.json() to parse the body of the request
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://jobify-career-guide.vercel.app",
    credentials: true,
  })
);
app.use("/api/auth", AuthRoute);
app.use("/api/Test", (req, res) => res.send("Hello World"));

app.use("/api/", TrackRoute);
//  Exporting the app
module.exports = app;

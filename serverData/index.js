import express from 'express'
import logger from 'morgan'
import * as dotenv from 'dotenv'
import * as url from 'url'
import mongooseDbConnect from './config/dbConnect.js'


import cookieParser from "cookie-parser";

// authorization
import verifyJWT from "./middleware/verifyJWT.js";
//Router
import postRouter from './router/postRouter.js'
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";





dotenv.config();
const PORT = process.env.PORT || 4000;

mongooseDbConnect();

const app = express();

// custom middleware logger
app.use(logger("short"));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use("/", express.static(__dirname + "/public"));

// routes
app.use("/auth", authRouter); // register, login, logout, refreshToken

// test to verify JWT
app.get("/secret", verifyJWT, (req, res) =>
  res.json({ success: true, message: "Secret Page" })
);

// REST for posts or user
app.use('/api/posts', postRouter);
app.use('/api/home', postRouter);
app.use("/api/new", postRouter);

app.use("/api/user", verifyJWT, userRouter);

app.get("/", (req, res) => {
  res.status(401).send({ error: "Invalid Endport" });
});
app.get("*", (req, res) => {
  res.status(404).json(new Error("Not Found Page!" + req.url));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// make server start listening on a specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "https://online-compiler-oqtkkzhi6-yashubanas-projects.vercel.app" }));
app.use(cookieParser());
config();

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

dbConnect();
app.listen(4000, () => {
  console.log("http://localhost:4000");
});

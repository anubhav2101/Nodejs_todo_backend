import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"



config({
  path: "./config/.env",
});

export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors(
  {
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    Credential: true
  }
))

 //routes
 app.use("/api/v1/users", userRoutes);
 app.use("/api/v1/tasks" , taskRoutes)

app.get("/", (req, res) => {
  res.send("everything working smothly");
});

//error middleware
app.use(errorMiddleware)

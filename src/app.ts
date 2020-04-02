import cors from "cors";
import express from "express";
import { OrderController } from "./controllers/order";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes below
app.get("/", (req, res) => res.send("OK"));

app.use("/order", OrderController);

// Error Handler Middleware
app.use(errorHandler);

export { app };
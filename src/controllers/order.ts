import { Router } from "express";
import wrapper from "express-async-handler";
import OrderService from "../services/Order.service";

const router = Router();

// this route is for pipedrive webhook only
router.post("/", wrapper(async ({ body }, res) => {
    res.send(await OrderService.createOrder(body.current));
}));

router.get("/", wrapper(async (req, res) => {
    res.send(await OrderService.getOrders());
}));

export { router as OrderController };

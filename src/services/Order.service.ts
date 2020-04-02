import { Order } from "../models/Order";
import { HttpError } from "../utils/HttpError";
import { DealStatus, UpdateDeal } from "../utils/interfaces";
import blingService from "./Bling.service"

class OrderService {

    async createOrder(deal: UpdateDeal) {

        // check wether the deal is won
        if (!deal || !deal.status || deal.status !== DealStatus.WON)
            throw new HttpError(400, "Wrong body");
        
        // create request on bling api
        // if the request already exists it will throw an error
        await blingService.createRequest({
            clientName: deal.person_name,
            code: deal.id,
            description: deal.title,
            value: deal.value
        });

        // if the request on bling is sucessful it should create
        // an order on the database
        await new Order({
            name: deal.title,
            clientName: deal.person_name,
            date: deal.update_time,
            value: deal.value,
            currency: deal.currency
        }).save();

    }

    async getOrders() {
        return await Order.find({}).sort({ date: -1 });
    }
}

export default new OrderService();

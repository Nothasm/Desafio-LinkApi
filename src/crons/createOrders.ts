import "../db";
import OrderService from "../services/Order.service";
import PipedriveService from "../services/Pipedrive.service";
import moment from "moment";

const TEN_MIN = 10 * 60 * 1000;

function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const log = (message?: any, ...optionalParams: any[]) => console.log(`[${moment().format("LTS")}]`, message, ...optionalParams);

export async function syncOrders() {
    try {
        log("SYNCING ORDERS")
        for (;;) {
            try {
                // here we get all deals with the won status
                const deals = await PipedriveService.getWonDeals();

                // loop throudh all the deals and createOrder
                // as the Bling Api already validate if the order is
                // already exists, there was no need for this validation
                // on our side
                deals.forEach(deal => OrderService.createOrder(deal)
                    .catch(error => log("ERROR: ", error.message)));
                
            } catch (error) {
                log("ERROR: ", error.message);
                log("RETRYING IN 10 MINUTES");
            }
            await sleep(TEN_MIN);
        }
    } catch (error) {
        console.error(error);
        log("RETRYING IN 10 MINUTES")
        await sleep(TEN_MIN);
    }
};

syncOrders();

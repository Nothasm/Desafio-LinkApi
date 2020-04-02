import OrderService from "../services/Order.service";
import PipedriveService from "../services/Pipedrive.service";

const TEN_MIN = 10 * 60 * 1000;

function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// idealy this would run in a independent worker
// as the api is small I thought it would be better
// to call it along with the server
export async function syncOrders(logs: boolean = false) {
    try {
        for (;;) {
            try {
                // here we get all deals with the won status
                const deals = await PipedriveService.getWonDeals();
                // loop throudh all the deals and createOrder
                // as the Bling Api already validate if the order is
                // already exists, there was no need for this validation
                // on our side
                deals.forEach(deal => OrderService.createOrder(deal)
                    .catch(e => !logs || console.log(e)));
                
            } catch (error) {
                !logs || console.error("error :", error);
            }
            await sleep(TEN_MIN);
        }
    } catch (error) {
        !logs || console.error("error :", error);
        await sleep(TEN_MIN);
    }
};

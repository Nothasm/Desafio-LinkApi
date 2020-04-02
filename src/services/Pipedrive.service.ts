import axios from "axios";
import { HttpError } from "../utils/HttpError";
import { DealStatus, PipedriveReturn, UpdateDeal } from "../utils/interfaces";

class PipedriveService {

    private client = axios.create({
        baseURL: process.env.PIPEDRIVE_URL
    });

    private apiKey = process.env.PIPEDRIVE_API_KEY

    async getWonDeals() {

        const { data, status } = await this.client.get<PipedriveReturn>("deals", {
            params: {
                status: DealStatus.WON,
                api_token: this.apiKey
            },
            validateStatus: () => true
        });

        if (status < 200 || status > 299)
            throw new HttpError(500, "An error ocurred trying to get data from Pipedrive Api");

        return data.data.map(deal => ({
            id: deal.id,
            title: deal.title,
            person_name: deal.person_name,
            value: deal.value,
            currency: deal.currency,
            update_time: deal.update_time,
            status: deal.status
        })) as UpdateDeal[];
    }

}

export default new PipedriveService();

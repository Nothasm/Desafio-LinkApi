import axios from "axios";
import { getBlingXMLRequestBody } from "../utils";
import { HttpError } from "../utils/HttpError";
import { BlingRequest, BlingReturn } from "../utils/interfaces";

class BlingService {

    private client = axios.create({
        baseURL: process.env.BLING_URL
    });

    private apiKey = process.env.BLING_API_KEY

    async createRequest(request: BlingRequest) {

        const xml = getBlingXMLRequestBody(request);

        const { data, status } = await this.client.post<BlingReturn>("/", null, {
            params: {
                apikey: this.apiKey,
                xml
            },
            validateStatus: () => true
        });

        if (data.retorno.erros && data.retorno.erros.length)
            throw new HttpError(400, data.retorno.erros[0].erro.msg);

        if (status < 200 || status > 299)
            throw new HttpError(500, "An error ocurred trying to create a request on Bling Api");
    }

}

export default new BlingService();

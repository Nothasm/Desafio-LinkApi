import { BlingRequest } from "./interfaces";

const { toXML } = require("jstoxml");

export function getBlingXMLRequestBody(request: BlingRequest) {
    return toXML({
        pedido: {
            cliente: {
                nome: request.clientName
            },
            itens: {
                item: {
                    codigo: request.code,
                    descricao: request.description,
                    vlr_unit: request.value,
                    qtde: "1"
                }
            }
        }
    });
}
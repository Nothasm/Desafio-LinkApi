export enum DealStatus {
  OPEN = "open",
  WON = "won",
  LOST = "lost",
  DELETED = "deleted"
}

export interface UpdateDeal {
    id: number,
    title: string,
    person_name: string,
    value: number,
    currency: string,
    update_time: string,
    status: DealStatus
}

export interface BlingRequest {
    clientName: string,
    code: number,
    description: string,
    value: number
}

export interface BlingReturn {
  retorno: {
    pedidos: [
      {
        pedido: {
          numero: string,
          idPedido: number
        }
      }
    ],
    erros: [
      {
        erro: {
          cod: 29 | 30 | 31 | 32 | 34,
          msg: string
        }
      }
    ]
  }
}


export interface PipedriveReturn {
    data: UpdateDeal[]
}
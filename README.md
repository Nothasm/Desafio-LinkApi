
# Desafio-LinkApi

  

Para iniciar a aplicação será preciso ter o `docker-compose`, e configurar as api keys nas variáveis de ambiente no `docker-compose.yml`.

  

- BLING_API_KEY:  `obrigatório para funcionamento da aplicação`

- PIPEDRIVE_API_KEY: `se informado vai rodar o cron que atualiza os pedidos`

  

Depois rodar o comando:

  

`docker-compose up --build`

  

A API vai estar disponivel na porta 3000.

  

A syncronização dos dados do Pipedrive pode ser feita de duas formas:

  

- Utilizando um webhook configurado no dash do pipedrive para o Event action `updated` e Event object `deal` para a rota `POST /order`
- E automaticante pelo cron que roda de 10 em 10 minutos, sendo apenas necessário ter a api key do pipedrive configurada configurada no ambiente 


 **Postman**: 
- https://www.getpostman.com/collections/1a6ad1b31d5b821ff544
import { app } from "./app";
import "./db";
import { syncOrders } from "./crons/createOrders";

const port = process.env.PORT;

if (process.env.AUTO_SYNC) syncOrders();

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

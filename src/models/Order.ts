import { Document, model, Schema } from "mongoose";

interface IOrder extends Document {
    _id: string
    name?: string
    clientName?: string
    date: Date
    value: number
    currency?: string
}

const orderSchema = new Schema({
    name: String,
    clientName:String,
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    currency: String
});

const Order = model<IOrder>("Order", orderSchema);

export { Order, IOrder };

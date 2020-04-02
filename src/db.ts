import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch((e: any) => console.log(e));

export { mongoose };
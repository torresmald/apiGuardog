import mongoose from "mongoose";
import { uniqueId } from "../utils/validate/validate.js";

const transactionSchema = new mongoose.Schema({

},
{
    timestamps: true
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
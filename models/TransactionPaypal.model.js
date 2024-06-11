import mongoose from "mongoose";

const transactionPaypalSchema = new mongoose.Schema({
    id: {type: String},
    intent: {type: String},
    status: {type: String},
    purchase_units: {type: [Object]},
    payer: {type: Object},
},
    {
        timestamps: true
    });


const TransactionPaypal = mongoose.model('Transaction Paypal', transactionPaypalSchema);

export default TransactionPaypal;
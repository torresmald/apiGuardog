import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: {type: Number},
    amount: {type: Number},
    amount_received: {type: Number},
    client_secret: {type: String},
    currency: {type: String, enum : ['eur']},
    customer: {type: String},
    description: {type: String},
    payment_method: {type: String},
    email: {type: String, default: ''}
},
{
    timestamps: true
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
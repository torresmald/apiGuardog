import Transaction from '../models/Transaction.model.js'
import Stripe from 'stripe';

class TransactionService {

    async createTransaction (token, amount, data){
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const chargeObject = await stripe.charges.create({
            amount,
            currency: 'eur',
            source: 'token',
            capture: false,
            description: data,
            receipt_email: 'jonathan.torresmald@gmail.com'
        })
        

        console.log(token);
        console.log(amount);
        console.log(data);
        console.log(chargeObject);
        return chargeObject
    }
}

const transactionService = new TransactionService()

export default transactionService
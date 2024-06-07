import Transaction from '../models/Transaction.model.js'
import Stripe from 'stripe';

class TransactionService {

    async createTransaction(payment_method_token, data) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const {  description, totalAmount } = data

        const chargeObject = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            description: description,
            receipt_email: 'jonathan.torresmald@gmail.com',
            payment_method_types: ['card'],
            payment_method: payment_method_token,
        })


        const paymentIntent = await stripe.paymentIntents.confirm(
            chargeObject.id,
            {
                payment_method: 'pm_card_visa',
                return_url: 'http://localhost:4200',
            }
        );

        return paymentIntent
    }
}

const transactionService = new TransactionService()

export default transactionService
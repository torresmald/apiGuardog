import Transaction from '../models/Transaction.model.js'
import TransactionPaypal from '../models/TransactionPaypal.model.js'
import Stripe from 'stripe';

class TransactionService {

    async createTransaction(payment_method_token, data) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { description, totalAmount, email } = data

        const chargeObject = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            description,
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
        const randomNumber = Math.floor(Math.random() * 100)
        const randomEmail = `jonathan.torresmald${randomNumber}@gmail.com`
        const transaction = new Transaction({
            paymentIntent,
            email: randomEmail
        });

        await transaction.save()

        return paymentIntent
    }
    async createTransactionPaypal(data) {
        console.log(data);
        const randomNumber = Math.floor(Math.random() * 100)

        const transaction = new TransactionPaypal({
            data,
            id: randomNumber
        });

        await transaction.save()

        return transaction
    }
}

const transactionService = new TransactionService()

export default transactionService
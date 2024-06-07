import transactionService from "../services/transactions.services.js"

const createTransaction = async (request, response, next) => {
    try {
        const {body} = request;
        const stripeToken = body.stripeToken;
        const amount = body.amount;
        const data = body.data;
        const amountEur = Math.floor(amount * 100);
        const transaction = await transactionService.createTransaction(stripeToken, amountEur, data)
        console.log(transaction);
        response.status(200).json(transaction)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}



export {
    createTransaction
}
import transactionService from "../services/transactions.services.js"

const createTransaction = async (request, response, next) => {
    try {
        const {body: {data, payment_method_token}} = request;
        const amountEur = Math.floor(data.totalAmount * 100);
        const dataToStripe = {
            totalAmount: amountEur,
            description: data.description
        }
        const transaction = await transactionService.createTransaction(payment_method_token, dataToStripe)
        response.status(200).json(transaction)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}



export {
    createTransaction
}
import express from "express";
import { createTransaction, createTransactionPaypal } from "../../controllers/transactionsController.js"

const transactionsRouter = express.Router();


transactionsRouter.route('/create-transaction')
    .post(createTransaction)
transactionsRouter.route('/create-transaction-paypal')
    .post(createTransactionPaypal)


export default transactionsRouter
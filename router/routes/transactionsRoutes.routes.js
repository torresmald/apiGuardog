import express from "express";
import { createTransaction } from "../../controllers/transactionsController.js"

const transactionsRouter = express.Router();


transactionsRouter.route('/create-transaction')
    .post(createTransaction)


export default transactionsRouter
import  express  from "express";
import { getCoupons, getDailyCoupon } from "../../controllers/couponsController.js";

const couponsRouter = express.Router()


couponsRouter.route('/')
    .get(getCoupons)
couponsRouter.route('/daily')
    .get(getDailyCoupon)






export default couponsRouter
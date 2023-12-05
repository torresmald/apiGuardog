import Coupon from "../models/Coupon.model.js"

class CouponsService {

    async getCoupons() {
        try {
            const allCoupons = await Coupon.find()
            if (allCoupons.length === 0) {
                throw new Error('La colección no existe')
            }
            return allCoupons.sort((a, b) => a.discount - b.discount)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getDailyCoupon() {
        try {
            const today = new Date();
            const dayOfMonth = today.getDate();
            const coupon = await Coupon.find();
            if (coupon.length === 0) {
                throw new Error('La colección no existe');
            }
            const index = (dayOfMonth - 1) % coupon.length;
            const dailyCoupon = coupon[index];
            return dailyCoupon;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
}

const couponsService = new CouponsService()

export default couponsService
import couponsService from "../services/coupons.services.js"


const getCoupons = async (request, response, next) => {
    try {
        const allCoupons = await couponsService.getCoupons()
        response.status(200).json(allCoupons)

    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getDailyCoupon = async (request, response, next) => {
    try {
        const dailyCoupon = await couponsService.getDailyCoupon()
        response.status(200).json(dailyCoupon)

    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}




export {
    getCoupons,
    getDailyCoupon
}
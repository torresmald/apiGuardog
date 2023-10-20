import mongoose from 'mongoose';

export const validateObjectId = (id, response) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El id no es válido')
        return response.status(400).json({
            msg: error.message
        })
    }
}


export const validateService = (message, response) => {
    const error = new Error(message)
    return response.status(404).json({
        msg: error.message
    })

}

export const  uniqueId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2)
}



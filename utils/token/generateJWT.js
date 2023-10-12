import jwt from 'jsonwebtoken'

export const generateJWT = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '4h' })
    return token
}
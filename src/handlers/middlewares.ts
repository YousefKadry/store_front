import { Request, Response,  } from 'express'
import jwt from 'jsonwebtoken'

// @ts-ignore
const verifyAuthToken = (req: Request, res: Response, next) => {
    
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRERT as jwt.Secret)
        next()
    } catch (error) {
        res.status(400)

    }
}
export default verifyAuthToken
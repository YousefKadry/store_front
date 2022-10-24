import { Request, Response,  } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

// @ts-ignore
const verifyAuthToken = (req: Request, res: Response, next) => {
    
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret) as JwtPayload
        if(!decoded.id){
            throw new Error
        }
        next()
    } catch (error) {
        return res.status(400).send(error)

    }
}
export default verifyAuthToken
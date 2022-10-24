import express, { Request, Response } from 'express'
import { user, users } from '../models/users';
import jwt from 'jsonwebtoken'
import verifyAuthToken from './middlewares'

const TOKEN_SECRET = process.env.TOKEN_SECRET


const new_user = new users()


const index = async (req: Request, res: Response): Promise<void> => {
    const results = await new_user.index();
    res.json(results)
}

const show = async (req: Request, res: Response): Promise<void> => {
    const results = await new_user.show(req.params.id);
    res.json(results);
}

const create = async (req: Request, res: Response): Promise<void> => {
    const _user: user = {
        id: 'null',
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password
    }
    const results = await new_user.create(_user);

    try {
        var token = jwt.sign({ id: results.id }, TOKEN_SECRET as jwt.Secret)
        res.json(token)
    }
    catch (err) {
        res.status(400)
        res.json(err)
    }
}
const authenticate = async (req: Request, res: Response): Promise<void> => {

    try {
        const results = await new_user.authenticate(req.body.fname, req.body.password)
        let token = jwt.sign({ id: results!.id }, process.env.TOKEN_SECRET as string)
        res.json(token)
    }
    catch (err) {
        res.status(401)
        res.json(err)

    }
}

const user_routes = (app: express.Application) => {
    app.get('/user', verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/user', create)
    app.post('/user/signin', authenticate)
}

export default user_routes;
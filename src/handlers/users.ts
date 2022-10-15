import express, { Request, Response } from 'express'
import { user, users } from '../models/users';
import jwt from 'jsonwebtoken'
import verifyAuthToken from './middlewares'

const TOKEN_SECRERT = process.env.TOKEN_SECRERT


const new_user = new users()


const index = async (req: Request, res: Response): Promise<void> =>{
    const results = await new_user.index();
    res.json(results)
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const results = await new_user.show(req.body.id);
    res.json(results);
}

const create = async (req: Request, res: Response): Promise<void> =>{
    const _user: user = {
        id: '0',
        fname: req.body.fname,
        lname: req.body.lname,
        password:req.body.password
    }
    const results = await new_user.create(_user);
    
    try{    
    var token = jwt.sign({user: results}, TOKEN_SECRERT as jwt.Secret)
        res.json({token:token})
        }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
const authenticate = async (req: Request, res: Response): Promise<void> =>{
    
    try{
        const u = await new_user.authenticate(req.body.fname, req.body.password)
        let token = jwt.sign({user: u}, process.env.TOKEN_SECRERT as string)
        res.header('Authorization', 'Bearer '+ token);
        res.json()
    }
    catch(err) {
        res.status(401)
        res.json(err)

    }
}

const user_routes = (app: express.Application) =>{
    app.get('/user', verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/user', create)
    app.post('/signin', authenticate)
}

export default user_routes
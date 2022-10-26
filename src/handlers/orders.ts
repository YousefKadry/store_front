import express, { Request, Response } from 'express'
import { order, orders } from '../models/orders';
import verifyAuthToken from './middlewares'

const myOrder = new orders()


const show = async (req: Request, res: Response): Promise<void> =>{
    const results = await myOrder.show_current(req.params.user_id);
    res.json(results);
}

const create = async (req: Request, res: Response): Promise<void> =>{
    try{    
        const order: order = {
            id:'null',
            user_id: req.body.user_id,
            status :'active'
        }
        const results = await myOrder.create(order);
        res.json(results);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
const complete = async (req: Request, res: Response): Promise<void> =>{
    const results = await myOrder.complete_order(req.params.id);
    res.json(results);
}


const order_routes = (app: express.Application) =>{
    app.patch('/order/:id', verifyAuthToken, complete)
    app.get('/order/:user_id', verifyAuthToken, show)
    app.post('/order', verifyAuthToken, create)
}
export default order_routes
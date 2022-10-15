import express, { Request, Response } from 'express'
import { order, orders } from '../models/orders';
import verifyAuthToken from './middlewares'

const myOrder = new orders()


const show = async (req: Request, res: Response): Promise<void> =>{
    const results = await myOrder.show_current(req.body.id);
    res.json(results);
}

const create = async (req: Request, res: Response): Promise<void> =>{
    try{    
        const _order: order = {
            user_id: req.body.id,
        }
        const results = await myOrder.create(_order);
        res.json(results);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
const complete = async (req: Request, res: Response): Promise<void> =>{
    const results = await myOrder.complete_order(req.body.id);
    res.json(results);
}


const order_routes = (app: express.Application) =>{
    app.patch('/order', verifyAuthToken, complete)
    app.get('/order/:id', verifyAuthToken, show)
    app.post('/order', verifyAuthToken, create)
}
export default order_routes
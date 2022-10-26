import express, { Request, Response } from 'express'
import { orders_products } from '../models/orders_products';
import verifyAuthToken from './middlewares'

const added_prodcut = new orders_products()


const add_product = async (req: Request, res: Response): Promise<void> =>{

    try{
        const results = await added_prodcut.add_product(req.params.order_id, req.body.product_id, req.body.quantity);
        res.json(results);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res:Response): Promise<void> =>{
    const deleted = await added_prodcut.delete(req.params.order_id, req.body.product_id)
    res.json(deleted)
}

const cart_routes = (app: express.Application) =>{
    app.post('/order/:order_id/addProduct', verifyAuthToken, add_product)
    app.delete('/order/:order_id/deleteProduct', verifyAuthToken, destroy)
}

export default cart_routes
import express, { Request, Response } from 'express'
import { product, products } from '../models/product'
import verifyAuthToken from './middlewares'


const myProduct = new products()


const index = async (req: Request, res: Response): Promise<void> =>{
    const results = await myProduct.index();
    res.json(results)
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const results = await myProduct.show(req.params.id);
    res.json(results);
}

const create = async (req: Request, res: Response): Promise<void> =>{
    try{    
        const prod: product = {
            id: '0',
            name: req.body.name,
            price: req.body.price
        }
        const results = await myProduct.create(prod);
        res.json(results);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (res:Response, req: Request): Promise<void> =>{
    console.log(req.params.id)
    console.log('gg')
    const deleted = await myProduct.delete(req.params.id)
    res.json(deleted)
}

const product_routes = (app: express.Application) =>{
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.delete('/products/:id', verifyAuthToken, destroy)
}

export default product_routes
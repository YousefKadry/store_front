import client from "../database";
import { order } from "./orders";

export class orders_products{

    async add_product(order_id:string, product_id:string, quantity:number):Promise<order>{
        try{
            const sql:string = `INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3)`
            const connect = await client.connect();
            const result = await connect.query(sql,[order_id, product_id, quantity]);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not add the product to the order. Error: ${err}`)
        }   
    }

    async delete(order_id:string, product_id:string):Promise<order>{
        try{
            const sql:string = `DELETE FROM orders_products where order_id= $1 AND product_id= $2 `
            const connect = await client.connect();
            const result = await connect.query(sql, [order_id, product_id]);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not delete the product from the order. Error: ${err}`)
        }   

    }   
}
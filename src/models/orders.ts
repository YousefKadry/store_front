// @ts-ignore
import {client} from "../database";

export type order = {
    id:string;
    user_id: number
    status: string
}


export class orders {


    async show_current(user_id:string): Promise<order[]>{
        try{
            const sql:string = `SELECT * FROM orders WHERE user_id = ${user_id} AND status = 'active'`;
            // @ts-ignore
            const connect = await client.connect();
            const result = await connect.query(sql);
            connect.release();
            return result.rows
        }
        catch(err){
            throw new Error(`Could not get the orders. Error: ${err}`)
        }
    }

    async create(order:order): Promise<order>{
        try{
            const sql:string = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`;
            // @ts-ignore
            const connect = await client.connect();
            const result = await connect.query(sql, [order.user_id, order.status]);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not create the order. Error: ${err}`)
        }
    }

    async complete_order(id:string): Promise<order>{
        try{
            const sql:string = `UPDATE orders SET status = 'complete' WHERE id = ${id} RETURNING *`
            // @ts-ignore
            const connect = await client.connect();
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not complete the the orders. Error: ${err}`)
        }
    }
}